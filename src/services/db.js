// db.js — Native IndexedDB helper for GATE Exam Storage
const IDB_NAME = 'GateExamNativeStorage';
const DB_VERSION = 10;

let idbPromise = null;

export function initDB() {
    if (idbPromise) return idbPromise;
    idbPromise = new Promise((resolve, reject) => {
        const request = indexedDB.open(IDB_NAME, DB_VERSION);
        request.onupgradeneeded = event => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('exams')) {
                const s = db.createObjectStore('exams', { keyPath: 'id', autoIncrement: true });
                s.createIndex('date', 'date', { unique: false });
            }
            if (!db.objectStoreNames.contains('exam_details')) {
                const s = db.createObjectStore('exam_details', { keyPath: 'id', autoIncrement: true });
                s.createIndex('exam_id', 'exam_id', { unique: false });
            }
            if (!db.objectStoreNames.contains('bookmarks')) {
                const s = db.createObjectStore('bookmarks', { keyPath: 'id', autoIncrement: true });
                s.createIndex('questionHash', 'questionHash', { unique: true });
                s.createIndex('examTitle', 'examTitle', { unique: false });
                s.createIndex('dateBookmarked', 'dateBookmarked', { unique: false });
            }
            if (!db.objectStoreNames.contains('silly_mistakes')) {
                const s = db.createObjectStore('silly_mistakes', { keyPath: 'id', autoIncrement: true });
                s.createIndex('questionHash', 'questionHash', { unique: true });
                s.createIndex('examTitle', 'examTitle', { unique: false });
                s.createIndex('dateMarked', 'dateMarked', { unique: false });
            }
            if (!db.objectStoreNames.contains('todos')) {
                const s = db.createObjectStore('todos', { keyPath: 'id', autoIncrement: true });
                s.createIndex('dateCreated', 'dateCreated', { unique: false });
                s.createIndex('targetDate', 'targetDate', { unique: false });
            } else {
                const req = event.target.transaction.objectStore('todos');
                if (!req.indexNames.contains('targetDate')) {
                    req.createIndex('targetDate', 'targetDate', { unique: false });
                }
            }
            if (!db.objectStoreNames.contains('custom_exam_tracker')) {
                const s = db.createObjectStore('custom_exam_tracker', { keyPath: 'questionHash' });
                s.createIndex('type', 'type', { unique: false });
            }
        };
        request.onblocked = () => console.warn('DB upgrade blocked');
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => { idbPromise = null; reject(request.error); };
    });
    return idbPromise;
}

export async function saveExamResult(summary, details) {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(['exams', 'exam_details'], 'readwrite');
        tx.onerror = () => reject(tx.error);
        const examsStore = tx.objectStore('exams');
        const detailsStore = tx.objectStore('exam_details');
        const examObj = {
            title: summary.title, file: summary.file || null, date: summary.timestamp,
            total_marks: parseFloat(summary.totalMarks), max_marks: parseFloat(summary.maxTotalMarks),
            correct: summary.correct, incorrect: summary.incorrect, unanswered: summary.unanswered,
            total_questions: summary.totalQuestions
        };
        const addReq = examsStore.add(examObj);
        addReq.onsuccess = event => {
            const examId = event.target.result;
            details.forEach(d => detailsStore.add({
                exam_id: examId, question_id: d.questionId, question_text: d.questionText,
                user_answer: d.userAnswer, correct_answer: d.correctAnswer, status: d.status,
                options: d.options, type: d.type || 'single', explanation: d.explanation || '',
                time_spent: d.timeSpent || 0, marks_obtained: d.marksObtained || 0,
                max_marks: d.maxMarks || 0, negative_marks: d.negativeMarks || 0,
                marked_for_review: d.markedForReview || false
            }));
        };
        tx.oncomplete = () => resolve(addReq.result);
    });
}

export async function getExamHistory() {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(['exams'], 'readonly');
        const req = tx.objectStore('exams').index('date').openCursor(null, 'prev');
        const exams = [];
        req.onsuccess = e => { const c = e.target.result; if (c) { exams.push(c.value); c.continue(); } else resolve(exams); };
        req.onerror = () => reject(req.error);
    });
}

// Get an exam by its ID
export async function getExamById(examId) {
    const db = await initDB();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['exams'], 'readonly');
        const store = transaction.objectStore('exams');

        const request = store.get(examId);

        request.onsuccess = event => {
            resolve(event.target.result);
        };

        request.onerror = () => reject(request.error);
    });
}

// Clear all exams and details
export async function clearAllExams() {
    const db = await initDB();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['exams', 'exam_details'], 'readwrite');
        const examsStore = transaction.objectStore('exams');
        const detailsStore = transaction.objectStore('exam_details');

        examsStore.clear();
        detailsStore.clear();

        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
    });
}

export async function getExamDetails(examId) {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const req = db.transaction(['exam_details'], 'readonly').objectStore('exam_details').index('exam_id').getAll(examId);
        req.onsuccess = e => { const d = e.target.result; d.sort((a,b) => a.question_id - b.question_id); resolve(d); };
        req.onerror = () => reject(req.error);
    });
}

export async function deleteExam(examId) {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(['exams', 'exam_details'], 'readwrite');
        tx.objectStore('exams').delete(examId);
        const req = tx.objectStore('exam_details').index('exam_id').openKeyCursor(examId);
        req.onsuccess = e => { const c = e.target.result; if (c) { tx.objectStore('exam_details').delete(c.primaryKey); c.continue(); } };
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}

export function makeQuestionHash(examTitle, questionId) { return `${examTitle || 'unknown'}__Q${questionId}`; }

export async function saveBookmarkToDB(data) {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(['bookmarks'], 'readwrite');
        const store = tx.objectStore('bookmarks');
        const obj = { ...data, dateBookmarked: new Date().toISOString() };
        const lookupReq = store.index('questionHash').get(data.questionHash);
        lookupReq.onsuccess = () => {
            if (lookupReq.result) obj.id = lookupReq.result.id;
            const w = store.put(obj);
            w.onsuccess = () => resolve(w.result);
            w.onerror = () => reject(w.error);
        };
        lookupReq.onerror = () => reject(lookupReq.error);
    });
}

export async function removeBookmarkFromDB(questionHash) {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(['bookmarks'], 'readwrite');
        const store = tx.objectStore('bookmarks');
        const req = store.index('questionHash').openCursor(questionHash);
        req.onsuccess = e => { const c = e.target.result; if (c) store.delete(c.primaryKey); };
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}

export async function getBookmarkByHash(questionHash) {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const req = db.transaction(['bookmarks'], 'readonly').objectStore('bookmarks').index('questionHash').get(questionHash);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

export async function updateBookmarkNoteInDB(questionHash, notes) {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(['bookmarks'], 'readwrite');
        const store = tx.objectStore('bookmarks');
        const req = store.index('questionHash').get(questionHash);
        req.onsuccess = () => {
            const data = req.result;
            if (data) { data.notes = notes; const u = store.put(data); u.onsuccess = () => resolve(true); u.onerror = () => reject(u.error); }
            else resolve(false);
        };
        req.onerror = () => reject(req.error);
    });
}

export async function getAllBookmarks() {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const req = db.transaction(['bookmarks'], 'readonly').objectStore('bookmarks').index('dateBookmarked').openCursor(null, 'prev');
        const items = [];
        req.onsuccess = e => { const c = e.target.result; if (c) { items.push(c.value); c.continue(); } else resolve(items); };
        req.onerror = () => reject(req.error);
    });
}

export async function isBookmarkedInDB(questionHash) {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const req = db.transaction(['bookmarks'], 'readonly').objectStore('bookmarks').index('questionHash').count(questionHash);
        req.onsuccess = () => resolve(req.result > 0);
        req.onerror = () => reject(req.error);
    });
}

export async function getBookmarkedHashesSet() {
    const b = await getAllBookmarks();
    return new Set(b.map(x => x.questionHash));
}

export async function clearAllBookmarks() {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(['bookmarks'], 'readwrite');
        tx.objectStore('bookmarks').clear();
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}

export async function saveSillyMistakeToDB(data) {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(['silly_mistakes'], 'readwrite');
        const store = tx.objectStore('silly_mistakes');
        const obj = { ...data, dateMarked: new Date().toISOString() };
        const lookupReq = store.index('questionHash').get(data.questionHash);
        lookupReq.onsuccess = () => {
            if (lookupReq.result) obj.id = lookupReq.result.id;
            const w = store.put(obj);
            w.onsuccess = () => resolve(w.result);
            w.onerror = () => reject(w.error);
        };
        lookupReq.onerror = () => reject(lookupReq.error);
    });
}

export async function removeSillyMistakeFromDB(questionHash) {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(['silly_mistakes'], 'readwrite');
        const store = tx.objectStore('silly_mistakes');
        const req = store.index('questionHash').openCursor(questionHash);
        req.onsuccess = e => { const c = e.target.result; if (c) store.delete(c.primaryKey); };
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}

export async function updateSillyMistakeNoteInDB(questionHash, notes) {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(['silly_mistakes'], 'readwrite');
        const store = tx.objectStore('silly_mistakes');
        const req = store.index('questionHash').get(questionHash);
        req.onsuccess = () => {
            const data = req.result;
            if (data) { data.notes = notes; const u = store.put(data); u.onsuccess = () => resolve(true); u.onerror = () => reject(u.error); }
            else resolve(false);
        };
        req.onerror = () => reject(req.error);
    });
}

export async function getAllSillyMistakes() {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const req = db.transaction(['silly_mistakes'], 'readonly').objectStore('silly_mistakes').index('dateMarked').openCursor(null, 'prev');
        const items = [];
        req.onsuccess = e => { const c = e.target.result; if (c) { items.push(c.value); c.continue(); } else resolve(items); };
        req.onerror = () => reject(req.error);
    });
}

export async function getSillyMistakeHashesSet() {
    const items = await getAllSillyMistakes();
    return new Set(items.map(s => s.questionHash));
}

export async function clearAllSillyMistakes() {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(['silly_mistakes'], 'readwrite');
        tx.objectStore('silly_mistakes').clear();
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}

export async function getAllExamDetails() {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const req = db.transaction(['exam_details'], 'readonly').objectStore('exam_details').getAll();
        req.onsuccess = e => resolve(e.target.result || []);
        req.onerror = () => reject(req.error);
    });
}

export async function getExamDetailsForIds(examIds) {
    const db = await initDB();
    const idSet = new Set(examIds);
    return new Promise((resolve, reject) => {
        const results = [];
        const req = db.transaction(['exam_details'], 'readonly').objectStore('exam_details').index('exam_id').openCursor();
        req.onsuccess = e => {
            const c = e.target.result;
            if (c) { if (idSet.has(c.value.exam_id)) results.push(c.value); c.continue(); }
            else resolve(results);
        };
        req.onerror = () => reject(req.error);
    });
}

export async function getUsedCustomExamHashes(type) {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const req = db.transaction(['custom_exam_tracker'], 'readonly').objectStore('custom_exam_tracker').index('type').getAll(type);
        req.onsuccess = e => resolve(new Set((e.target.result || []).map(r => r.questionHash)));
        req.onerror = () => reject(req.error);
    });
}

export async function saveUsedCustomExamHashes(hashes, type) {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(['custom_exam_tracker'], 'readwrite');
        const store = tx.objectStore('custom_exam_tracker');
        hashes.forEach(hash => store.put({ questionHash: hash, type, dateUsed: new Date().toISOString() }));
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => reject(tx.error);
    });
}

export async function clearCustomExamTracker(type) {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(['custom_exam_tracker'], 'readwrite');
        const store = tx.objectStore('custom_exam_tracker');
        const req = store.index('type').openKeyCursor(type);
        req.onsuccess = e => { const c = e.target.result; if (c) { store.delete(c.primaryKey); c.continue(); } };
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => reject(tx.error);
    });
}

export async function exportAllData() {
    const db = await initDB();
    const stores = ['exams', 'exam_details', 'bookmarks', 'silly_mistakes', 'todos', 'custom_exam_tracker'];
    let exportData = {};
    return new Promise((resolve, reject) => {
        const tx = db.transaction(stores, 'readonly');
        tx.oncomplete = () => resolve(exportData);
        tx.onerror = () => reject(tx.error);
        stores.forEach(name => {
            const req = tx.objectStore(name).getAll();
            req.onsuccess = e => { exportData[name] = e.target.result || []; };
        });
    });
}

export async function downloadBackup() {
    try {
        const db = await initDB();
        const stores = ['exams', 'exam_details', 'bookmarks', 'silly_mistakes', 'todos', 'custom_exam_tracker'];
        const chunks = ['{'];
        for (let i = 0; i < stores.length; i++) {
            const name = stores[i];
            if (i > 0) chunks.push(',');
            chunks.push(`"${name}":[`);
            const records = await new Promise((res, rej) => {
                const tx = db.transaction([name], 'readonly');
                const req = tx.objectStore(name).getAll();
                req.onsuccess = () => res(req.result || []);
                req.onerror = () => rej(req.error);
            });
            const BATCH = 200;
            for (let j = 0; j < records.length; j += BATCH) {
                if (j > 0) chunks.push(',');
                chunks.push(records.slice(j, j + BATCH).map(r => JSON.stringify(r)).join(','));
            }
            chunks.push(']');
        }
        chunks.push('}');
        const blob = new Blob(chunks, { type: 'application/json' });
        const dateStr = new Date().toISOString().split('T')[0];
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = `GATE_Exam_Backup_${dateStr}.json`;
        document.body.appendChild(a); a.click();
        setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 100);
        return true;
    } catch (e) { console.error('Backup failed:', e); return false; }
}

export async function importAllData(jsonData) {
    const db = await initDB();
    const stores = ['exams', 'exam_details', 'bookmarks', 'silly_mistakes', 'todos'];
    if (!jsonData || typeof jsonData !== 'object') throw new Error('Invalid backup file format.');
    await new Promise((resolve, reject) => {
        const tx = db.transaction(stores, 'readwrite');
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
        stores.forEach(name => { if (jsonData[name]) tx.objectStore(name).clear(); });
    });
    const BATCH_SIZE = 500;
    for (const name of stores) {
        const items = jsonData[name];
        if (!items || !Array.isArray(items) || items.length === 0) continue;
        for (let i = 0; i < items.length; i += BATCH_SIZE) {
            const batch = items.slice(i, i + BATCH_SIZE);
            await new Promise((resolve, reject) => {
                const tx = db.transaction([name], 'readwrite');
                const store = tx.objectStore(name);
                batch.forEach(item => store.add(item));
                tx.oncomplete = () => resolve();
                tx.onerror = () => reject(tx.error);
            });
        }
    }
    return true;
}

export function formatStorageSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}
