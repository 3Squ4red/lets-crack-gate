const fs = require('fs').promises;
const path = require('path');

// Target directory path
const TARGET_DIR = 'C:\\Users\\anishdesai\\Documents\\Github\\GatePYQ\\Exams';

/**
 * Validates if the correct_answer is missing from options or marked as N/A (theoretical)
 */
function isMissingAnswer(q) {
    // Treat "N/A", empty string, or null as not answered / theoretical
    if (q.correct_answer === "N/A" || q.correct_answer === "" || q.correct_answer == null) {
        return true;
    }
    
    if (q.type === 'single') {
        // If it's a single choice, the answer must exactly match one of the options
        return !q.options.includes(q.correct_answer);
    }
    
    if (q.type === 'multiple') {
        // If it's multiple choice, correct_answer should be an array and every element must exist in options
        if (!Array.isArray(q.correct_answer)) return true; 
        return q.correct_answer.some(ans => !q.options.includes(ans));
    }
    
    if (q.type === 'numeric') {
        // Numeric questions don't have options. If we passed the "N/A" check above, it's a valid numeric answer
        return false; 
    }
    
    return false; 
}

/**
 * Calculates time recursively (Gate logic: 65 questions -> 180 minutes)
 */
function calculateDuration(questionCount) {
    if (questionCount === 0) return 0;
    return Math.round((questionCount / 65) * 180);
}

/**
 * Processes a single data.json file
 */
async function processDataJson(filePath) {
    try {
        const fileContent = await fs.readFile(filePath, 'utf8');
        let data;
        try {
            data = JSON.parse(fileContent);
        } catch (e) {
            console.error(`❌ Invalid JSON in ${filePath}`);
            return;
        }

        if (!data.sections || !Array.isArray(data.sections)) return;

        let hasModifications = false;
        
        // Deep clone original JSON to build the theoretical/unanswered file structure
        const newData = JSON.parse(JSON.stringify(data));
        newData.title = `${newData.title} - Theoretical/Not Answered`;
        
        let originalQuestionCount = 0;
        let extractedQuestionCount = 0;

        for (let i = 0; i < data.sections.length; i++) {
            const originalSection = data.sections[i];
            const newSection = newData.sections[i];

            const validQuestions = [];
            const invalidQuestions = [];

            if (Array.isArray(originalSection.questions)) {
                for (const q of originalSection.questions) {
                    if (isMissingAnswer(q)) {
                        invalidQuestions.push(q);
                    } else {
                        validQuestions.push(q);
                    }
                }
            }

            // Apply separated arrays
            originalSection.questions = validQuestions;
            newSection.questions = invalidQuestions;

            originalQuestionCount += validQuestions.length;
            extractedQuestionCount += invalidQuestions.length;

            if (invalidQuestions.length > 0) {
                hasModifications = true;
            }
        }

        if (hasModifications) {
            // 1. Recalculate durations dynamically 
            data.duration = calculateDuration(originalQuestionCount);
            newData.duration = calculateDuration(extractedQuestionCount);

            // 2. Overwrite the original file with valid questions only
            await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
            console.log(`✅ Updated original: ${filePath} | Duration: ${data.duration}m | Qs: ${originalQuestionCount}`);

            // 3. Construct paths for the newly created directory
            const currentDir = path.dirname(filePath);
            const dirName = path.basename(currentDir);
            const parentDir = path.dirname(currentDir);
            
            const newDirName = `${dirName}_Theoritical_or_not_answered`;
            const newDirPath = path.join(parentDir, newDirName);

            // 4. Create new directory and write the extracted questions JSON
            await fs.mkdir(newDirPath, { recursive: true });
            const newFilePath = path.join(newDirPath, 'data.json');
            await fs.writeFile(newFilePath, JSON.stringify(newData, null, 2), 'utf8');
            
            console.log(`📁 Created new: ${newFilePath} | Duration: ${newData.duration}m | Qs: ${extractedQuestionCount}\n`);
        }

    } catch (err) {
        console.error(`❌ Error processing file ${filePath}:`, err);
    }
}

/**
 * Recursively scans directory for data.json files
 */
async function processDirectory(dir) {
    try {
        const entries = await fs.readdir(dir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);

            if (entry.isDirectory()) {
                // Ignore directories that we already created so we don't end up in an infinite loop
                if (entry.name.endsWith('_Theoritical_or_not_answered')) {
                    continue;
                }
                await processDirectory(fullPath);
            } else if (entry.isFile() && entry.name === 'data.json') {
                await processDataJson(fullPath);
            }
        }
    } catch (err) {
        console.error(`❌ Error scanning directory ${dir}:`, err);
    }
}

// Start Script
console.log(`🚀 Starting execution in: ${TARGET_DIR}\n`);
processDirectory(TARGET_DIR)
    .then(() => console.log('🎉 Execution completed!'))
    .catch(err => console.error(err));
