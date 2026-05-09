async function handleClearAllExams() {
    if (!confirm("Are you sure you want to delete ALL test history? This action cannot be undone.")) return;
    try {
        await clearAllExams();
        // Clear the in-memory cache so renderHistoryTable sees an empty list immediately
        if (typeof allExams !== 'undefined') allExams.length = 0;
        if (typeof renderHistoryTable === 'function') renderHistoryTable();
        if (typeof loadSubjectAccuracyChart === 'function') loadSubjectAccuracyChart();
    } catch (e) {
        console.error(e);
        alert("Failed to delete history: " + e.message);
    }
}

async function handleExportData() {
        if (
          confirm(
            "This will download a full backup of all your exams, bookmarks, and silly mistakes. Proceed?",
          )
        ) {
          const success = await downloadBackup();
          if (success) alert("Backup downloaded successfully!");
          else alert("Failed to backup data.");
        }
      }

      async function handleImportData(event) {
        const file = event.target.files[0];
        if (!file) return;

        if (
          confirm(
            "WARNING: Restoring data will OVERWRITE and REPLACE all your current exams, bookmarks, and silly mistakes with the data from the backup file. Are you sure you want to proceed?",
          )
        ) {
          const reader = new FileReader();
          reader.onload = async function (e) {
            try {
              const jsonData = JSON.parse(e.target.result);
              await importAllData(jsonData);
              alert("Data restored successfully! The page will now reload.");
              location.reload();
            } catch (error) {
              alert("Error restoring data: " + error.message);
              console.error(error);
            }
          };
          reader.readAsText(file);
        }
        // Reset input
        event.target.value = "";
      }

      // ============================================
      // Telegram Setup Wizard Logic
      // ============================================
      function handleTgBtnClick() {
        const token = localStorage.getItem("tgBotToken");
        const chatId = localStorage.getItem("tgChatId");

        if (token && chatId) {
          if (confirm("Do you want to Backup to Telegram now?")) {
            const btn = document.getElementById("tgSetupBtn");
            const oldHtml = btn.innerHTML;
            btn.innerHTML = "⏳ Backing up...";

            const backupPromise = autoBackupToTelegram(true);
            if (backupPromise && backupPromise.finally) {
              backupPromise.finally(() => {
                btn.innerHTML = oldHtml;
              });
            } else {
              btn.innerHTML = oldHtml;
            }
          }
        } else {
          openTgSetupModal();
        }
      }

      function openTgSetupModal() {
        document.getElementById("tgInputToken").value =
          localStorage.getItem("tgBotToken") || "";
        document.getElementById("tgInputChatId").value =
          localStorage.getItem("tgChatId") || "";

        document.getElementById("tgSetupModal").classList.add("active");
        nextTgStep(1);
      }

      function closeTgSetupModal() {
        document.getElementById("tgSetupModal").classList.remove("active");
      }

      function nextTgStep(stepNum) {
        if (stepNum === 2) {
          const token = document.getElementById("tgInputToken").value.trim();
          if (!token) {
            alert("Please enter your bot token to proceed.");
            return;
          }
        } else if (stepNum === 4) {
          const chatIdRaw = document
            .getElementById("tgInputChatId")
            .value.trim();
          if (!chatIdRaw) {
            alert("Please enter your Channel ID to proceed.");
            return;
          }

          // Format chat ID
          let formattedChatId = chatIdRaw;
          // If it's a positive number or doesn't start with -100, we probably need to prepend -100 for Telegram Channels
          if (
            !formattedChatId.startsWith("-100") &&
            !formattedChatId.startsWith("@")
          ) {
            // Remove any existing minus sign just in case
            formattedChatId = "-100" + formattedChatId.replace(/^-/, "");
          }

          document.getElementById("tgVerifyToken").textContent = document
            .getElementById("tgInputToken")
            .value.trim();
          document.getElementById("tgVerifyChatId").textContent =
            formattedChatId;
        }

        document
          .querySelectorAll(".tg-step")
          .forEach((el) => (el.style.display = "none"));
        document.getElementById("tgStep" + stepNum).style.display = "block";
      }

      function saveTgSetup() {
        const token = document.getElementById("tgInputToken").value.trim();
        let chatId = document.getElementById("tgVerifyChatId").textContent;

        localStorage.setItem("tgBotToken", token);
        localStorage.setItem("tgChatId", chatId);

        closeTgSetupModal();
        alert(
          "Telegram settings saved successfully! We will attempt a backup now.",
        );
        autoBackupToTelegram(true); // Force backup attempt
      }

      function copyPromptText(btn) {
        const pre = btn.closest(".pre-wrapper").querySelector("pre");
        const text = pre.textContent;
        navigator.clipboard.writeText(text).then(() => {
          const span = btn.querySelector("span");
          const originalText = span.textContent;
          span.textContent = "Copied!";
          btn.classList.add("copied");
          setTimeout(() => {
            span.textContent = originalText;
            btn.classList.remove("copied");
          }, 2000);
        });
      }

// Calculator Toggle & Drag
      function gateToggleCalculator() {
        const calcModal = document.getElementById("calculator-modal");
        if (
          calcModal.style.display === "none" ||
          calcModal.style.display === ""
        ) {
          calcModal.style.display = "block";
        } else {
          calcModal.style.display = "none";
        }
      }

      // Make calculator modal draggable
      document.addEventListener("DOMContentLoaded", function () {
        const elmnt = document.getElementById("calculator-modal");
        const header = document.getElementById("calc-header");
        if (!elmnt || !header) return;

        var pos1 = 0,
          pos2 = 0,
          pos3 = 0,
          pos4 = 0;
        header.onmousedown = function (e) {
          e = e || window.event;
          e.preventDefault();
          pos3 = e.clientX;
          pos4 = e.clientY;
          document.onmouseup = function () {
            document.onmouseup = null;
            document.onmousemove = null;
          };
          document.onmousemove = function (e) {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            elmnt.style.top = elmnt.offsetTop - pos2 + "px";
            elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
            elmnt.style.right = "auto";
          };
        };
      });

      // Sidebar Toggle
      function gateToggleSidebar() {
        const rightPanel = document.getElementById("gate-right-panel");
        const sidebarToggle = document.querySelector(".gate-sidebar-toggle");

        if (rightPanel.style.display !== "none") {
          rightPanel.style.display = "none";
          sidebarToggle.classList.remove("close");
          sidebarToggle.classList.add("open");
        } else {
          rightPanel.style.display = "flex";
          sidebarToggle.classList.remove("open");
          sidebarToggle.classList.add("close");
        }
        setTimeout(gateCheckScroll, 50);
      }

      // Scroll Arrow Logic
      function gateCheckScroll() {
        const container = document.getElementById("gate-question-container");
        const upBtn = document.getElementById("gate-scroll-up");
        const downBtn = document.getElementById("gate-scroll-down");

        if (!container) return;

        const isScrollable =
          container.scrollHeight > container.clientHeight + 2;

        if (isScrollable) {
          const isAtTop = container.scrollTop === 0;
          const isAtBottom =
            Math.ceil(container.scrollTop + container.clientHeight) >=
            container.scrollHeight - 2;

          if (isAtTop) {
            downBtn.style.display = "block";
            upBtn.style.display = "none";
          } else if (isAtBottom) {
            downBtn.style.display = "none";
            upBtn.style.display = "block";
          } else {
            downBtn.style.display = "block";
            upBtn.style.display = "block";
          }
        } else {
          downBtn.style.display = "none";
          upBtn.style.display = "none";
        }
      }

      function gateScrollToBottom() {
        const container = document.getElementById("gate-question-container");
        container.scrollTop = container.scrollHeight;
      }

      function gateScrollToTop() {
        const container = document.getElementById("gate-question-container");
        container.scrollTop = 0;
      }

// Load test history on page load
      (async function () {
        try {
          // Security cleanup: Remove old stored tokens if they match unexpected formats
          const storedToken = localStorage.getItem("tgBotToken");
          if (storedToken && storedToken.length > 50) {
            localStorage.removeItem("tgBotToken");
            localStorage.removeItem("tgChatId");
          }

          await initDB();
          await loadHistory();
          initHomeFeatures();

          // Trigger auto-backup check
          autoBackupToTelegram();
          initTodos();
          // loadStorageUsage();

          if (typeof loadSubjectAccuracyChart === "function") {
            loadSubjectAccuracyChart(allExams);
          }
        } catch (e) {
          console.warn("Could not load history or trigger backup:", e);
        }
      })();

      // // Load and display storage usage
      // async function loadStorageUsage() {
      //     try {
      //         const usage = await getStorageUsage();
      //         const el = document.getElementById('storageUsageValue');
      //         if (el) {
      //             el.textContent = formatStorageSize(usage.used) + ' used';
      //             // Color code based on size
      //             const parent = el.parentElement;
      //             if (usage.used > 500 * 1024 * 1024) parent.style.color = '#e74c3c'; // > 500MB: red
      //             else if (usage.used > 100 * 1024 * 1024) parent.style.color = '#e67e22'; // > 100MB: orange
      //             else parent.style.color = '#27ae60'; // green
      //         }
      //     } catch (e) {
      //         console.warn('Could not load storage usage:', e);
      //     }
      // }

      // ============================================
      // Auto-Backup to Telegram
      // ============================================
      let isBackingUp = false;
      async function autoBackupToTelegram(force = false) {
        return; // Telegram feature removed
        if (isBackingUp) return;

        const token = localStorage.getItem("tgBotToken");
        const chatId = localStorage.getItem("tgChatId");

        // Only proceed if setup is complete
        if (!token || !chatId) {
          if (force) alert("Please complete the Telegram Backup Setup first.");
          return;
        }

        const lastBackupStr = localStorage.getItem("lastTelegramBackup");
        const now = Date.now();

        // Auto backup once every 24 hours unless forced
        const ONE_DAY = 24 * 60 * 60 * 1000;
        if (
          !force &&
          lastBackupStr &&
          now - parseInt(lastBackupStr) < ONE_DAY
        ) {
          return;
        }

        try {
          isBackingUp = true;

          const data = await exportAllData();
          const jsonStr = JSON.stringify(data);
          const blob = new Blob([jsonStr], { type: "application/json" });

          const dateStr = new Date().toISOString().split("T")[0];
          const fileName = `GATE_Exam_Backup_${dateStr}.json`;
          const file = new File([blob], fileName, { type: "application/json" });

          const formData = new FormData();
          formData.append("chat_id", chatId);
          formData.append("document", file);
          formData.append(
            "caption",
            `📦 GATE Prep DB Backup\n📅 ${new Date().toLocaleString()}`,
          );

          const url = `https://api.telegram.org/bot${token}/sendDocument`;

          // Return promise to allow caller to track completion
          return fetch(url, {
            method: "POST",
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.ok) {
                localStorage.setItem("lastTelegramBackup", now.toString()); // Note: user code used lastTgBackupTime, but we'll use existing key lastTelegramBackup or use lastTgBackupTime
                if (force) alert("Backup successfully sent to Telegram!");
              } else {
                console.error("Telegram API Error:", data);
                if (force) {
                  if (
                    confirm(
                      "Failed to send backup to Telegram: " +
                        data.description +
                        "\n\nWould you like to edit your Bot Token and Channel ID?",
                    )
                  ) {
                    openTgSetupModal();
                  }
                }
              }
            })
            .catch((err) => {
              console.error("Fetch Error:", err);
              if (force) {
                if (
                  confirm(
                    "Network error while sending backup to Telegram.\n\nWould you like to edit your Bot Token and Channel ID?",
                  )
                ) {
                  openTgSetupModal();
                }
              }
            })
            .finally(() => {
              isBackingUp = false;
            });
        } catch (e) {
          console.error("Error generating backup for Telegram:", e);
          isBackingUp = false;
          if (force) alert("Error generating backup file.");
        }
      }

      // Load and display storage usage
      async function loadStorageUsage() {
        try {
          const usage = await getStorageUsage();
          const el = document.getElementById("storageUsageValue");
          if (el) {
            el.textContent = formatStorageSize(usage.used) + " used";
            // Color code based on size
            const parent = el.parentElement;
            if (usage.used > 500 * 1024 * 1024)
              parent.style.color = "#e74c3c"; // > 500MB: red
            else if (usage.used > 100 * 1024 * 1024)
              parent.style.color = "#e67e22"; // > 100MB: orange
            else parent.style.color = "#27ae60"; // green
          }
        } catch (e) {
          console.warn("Could not load storage usage:", e);
        }
      }

      let allExams = [];

      // Populate subject filter dropdowns using GATE_SUBJECTS from subject_detector.js
      function populateSubjectDropdowns() {
        if (typeof GATE_SUBJECTS === "undefined") return;
        const dropdowns = [
          document.getElementById("customSubjectFilter"),
          document.getElementById("historySubjectFilter"),
        ];
        dropdowns.forEach((sel) => {
          if (!sel) return;
          GATE_SUBJECTS.forEach((s) => {
            const opt = document.createElement("option");
            opt.value = s.id;
            opt.textContent = `${s.icon} ${s.name}`;
            sel.appendChild(opt);
          });
          // Add "Mixed / Other" option
          const mixedOpt = document.createElement("option");
          mixedOpt.value = "mixed";
          mixedOpt.textContent = "🎲 Mixed / Other";
          sel.appendChild(mixedOpt);
        });
      }
      populateSubjectDropdowns();

      async function loadHistory() {
        allExams = await getExamHistory();
        renderHistoryTable();
        // Refresh library attempt counters whenever history is loaded
        if (typeof window.refreshLibraryAttempts === 'function') {
            window.refreshLibraryAttempts();
        }
      }

      // Global variable to track the currently selected date for the To-Do list
      // Defaults to today's date in YYYY-MM-DD format
      let currentTodoDate = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-${String(new Date().getDate()).padStart(2, "0")}`;
      let currentDnTab = "todo"; // 'todo' or 'notes'

      // Initialize To-Dos
      async function initTodos() {
        if (!document.getElementById("addTodoBtn")) return;
        try {
          await initDB();
          await renderTodoList();

          document
            .getElementById("addTodoBtn")
            .addEventListener("click", handleAddTodo);
          document
            .getElementById("todoInput")
            .addEventListener("keypress", (e) => {
              if (e.key === "Enter") handleAddTodo();
            });

          // Tab switching
          document.querySelectorAll(".dn-tab").forEach((tab) => {
            tab.addEventListener("click", () => {
              document
                .querySelectorAll(".dn-tab")
                .forEach((t) => t.classList.remove("active"));
              tab.classList.add("active");
              currentDnTab = tab.getAttribute("data-tab");

              // Update placeholder
              const input = document.getElementById("todoInput");
              input.placeholder =
                currentDnTab === "todo" ? "Add a to-do..." : "Add a note...";
              input.focus();

              renderTodoList();
            });
          });
        } catch (e) {
          console.warn("Could not load To-Dos:", e);
        }
      }

      // Expose function for the Streak Calendar to call when a date is clicked
      window.selectTodoDate = async function (dateStr) {
        currentTodoDate = dateStr;

        // Format for display
        const d = new Date(dateStr);
        const displayTitle = d.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });

        // If today, label it "Daily Notes", else specific date
        const todayStr = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-${String(new Date().getDate()).padStart(2, "0")}`;
        const headerLabel = document.getElementById("todoHeaderLabel");
        if (dateStr === todayStr) {
          headerLabel.textContent = "📝 DAILY NOTES";
        } else {
          headerLabel.textContent = `📝 Notes: ${displayTitle}`;
        }

        // Animate refresh
        const listEl = document.getElementById("todoList");
        if (listEl) {
          listEl.style.opacity = "0.5";
          await renderTodoList();
          listEl.style.opacity = "1";
        }
      };

      async function renderTodoList() {
        const listEl = document.getElementById("todoList");
        if (!listEl) return;

        try {
          // Fetch all items for this date then filter by current tab type
          const allItems = await getTodosByDate(currentTodoDate);
          const filterType = currentDnTab === "notes" ? "note" : "todo";
          const items = allItems.filter((item) => {
            const itemType = item.type || "todo"; // backward compat: old items default to 'todo'
            return itemType === filterType;
          });

          if (items.length === 0) {
            const emptyMsg =
              currentDnTab === "todo"
                ? "No to-dos for today. Add one above!"
                : "No notes for today. Add one above!";
            listEl.innerHTML = `<div class="todo-empty-state">${emptyMsg}</div>`;
            return;
          }

          items.sort(
            (a, b) => new Date(a.dateCreated) - new Date(b.dateCreated),
          );

          if (currentDnTab === "todo") {
            // To-Do mode: checkboxes + edit + delete
            listEl.innerHTML = items
              .map(
                (todo) => `
                        <li class="todo-item ${todo.completed ? "completed" : ""}" data-id="${todo.id}">
                            <div class="todo-content">
                                <input type="checkbox" class="todo-checkbox" ${todo.completed ? "checked" : ""} onchange="handleToggleTodo(${todo.id}, this.checked)">
                                <span class="todo-text">${escapeHtml(todo.text)}</span>
                            </div>
                            <div class="todo-actions">
                                <button class="todo-edit-btn" onclick="handleEditTodo(${todo.id})" title="Edit">✏️</button>
                                <button class="todo-delete-btn" onclick="handleDeleteTodo(${todo.id})" title="Delete">&#10005;</button>
                            </div>
                        </li>
                    `,
              )
              .join("");
          } else {
            // Notes mode: bullet points + edit + delete
            listEl.innerHTML = items
              .map(
                (note) => `
                        <li class="todo-item" data-id="${note.id}">
                            <div class="todo-content">
                                <span class="note-bullet"></span>
                                <span class="todo-text">${escapeHtml(note.text)}</span>
                            </div>
                            <div class="todo-actions">
                                <button class="todo-edit-btn" onclick="handleEditTodo(${note.id})" title="Edit">✏️</button>
                                <button class="todo-delete-btn" onclick="handleDeleteTodo(${note.id})" title="Delete">&#10005;</button>
                            </div>
                        </li>
                    `,
              )
              .join("");
          }
        } catch (e) {
          console.error("Error rendering todos:", e);
          listEl.innerHTML =
            '<div class="todo-empty-state" style="color:#e74c3c;">Failed to load items.</div>';
        }
      }

      // Inline edit: replaces text with an input field
      window.handleEditTodo = function (id) {
        const li = document.querySelector(`.todo-item[data-id="${id}"]`);
        if (!li) return;
        const textSpan = li.querySelector(".todo-text");
        const oldText = textSpan.textContent;

        // Create inline input
        const input = document.createElement("input");
        input.type = "text";
        input.value = oldText;
        input.className = "todo-edit-input";

        // Replace span with input
        textSpan.replaceWith(input);
        input.focus();
        input.select();

        // Hide edit button while editing
        const editBtn = li.querySelector(".todo-edit-btn");
        if (editBtn) editBtn.style.display = "none";

        const save = async () => {
          const newText = input.value.trim();
          if (newText && newText !== oldText) {
            try {
              await updateTodoTextInDB(id, newText);
            } catch (e) {
              console.error("Error updating todo:", e);
            }
          }
          await renderTodoList();
        };

        input.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            save();
          }
          if (e.key === "Escape") {
            renderTodoList();
          }
        });
        input.addEventListener("blur", save);
      };

      async function handleAddTodo() {
        const input = document.getElementById("todoInput");
        const text = input.value.trim();
        if (!text) return;

        try {
          input.value = "";
          await saveTodoToDB(
            text,
            currentTodoDate,
            currentDnTab === "notes" ? "note" : "todo",
          );
          await renderTodoList();
          // Refresh calendar to show the dot marker if this was the first task
          if (typeof loadCalendar === "function") loadCalendar();
        } catch (e) {
          console.error("Error adding todo:", e);
        }
      }

      window.handleToggleTodo = async function (id, completed) {
        try {
          await toggleTodoInDB(id, completed);
          await renderTodoList();
        } catch (e) {
          console.error("Error toggling todo:", e);
        }
      };

      window.handleDeleteTodo = async function (id) {
        try {
          await removeTodoFromDB(id);
          await renderTodoList();
          // Refresh calendar to potentially remove the dot marker
          if (typeof loadCalendar === "function") loadCalendar();
        } catch (e) {
          console.error("Error deleting todo:", e);
        }
      };

      function escapeHtml(unsafe) {
        return (unsafe || "")
          .toString()
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");
      }

      let currentHistoryPage = 1;
      const historyItemsPerPage = 10;

      function changeHistoryPage(direction) {
        currentHistoryPage += direction;
        renderHistoryTable(false);

        // Optionally scroll to top of history section
        const section = document.getElementById("historySection");
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }

      function renderHistoryTable(resetPage = true) {
        if (resetPage) {
          currentHistoryPage = 1;
        }

        const section = document.getElementById("historySection");
        const tbody = document.getElementById("historyBody");

        if (allExams.length === 0) {
          section.style.display = "none";
          return;
        }

        section.style.display = "block";

        const searchInput = document.getElementById("historySearch");
        const sortSelect = document.getElementById("historySort");

        const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";
        const sortBy = sortSelect ? sortSelect.value : "newest";

        // Subject filter
        const subjectFilterEl = document.getElementById("historySubjectFilter");
        const subjectFilter = subjectFilterEl ? subjectFilterEl.value : "all";

        let filtered = allExams.filter((exam) => {
          // Text search filter
          if (!exam.title.toLowerCase().includes(searchTerm)) return false;
          // Subject filter
          if (subjectFilter !== "all") {
            const detected =
              typeof detectSubject === "function"
                ? detectSubject(exam.title)
                : null;
            if (subjectFilter === "mixed") {
              if (detected !== null) return false; // "mixed" means undetected subject
            } else {
              if (!detected || detected.id !== subjectFilter) return false;
            }
          }
          return true;
        });

        filtered.sort((a, b) => {
          if (sortBy === "newest") return new Date(b.date) - new Date(a.date);
          if (sortBy === "oldest") return new Date(a.date) - new Date(b.date);

          // Use the exact same percentage formula as the display table
          const scoreA =
            parseFloat(a.max_marks) > 0
              ? (parseFloat(a.total_marks) / parseFloat(a.max_marks)) * 100
              : 0;
          const scoreB =
            parseFloat(b.max_marks) > 0
              ? (parseFloat(b.total_marks) / parseFloat(b.max_marks)) * 100
              : 0;

          if (sortBy === "score_high") return scoreB - scoreA;
          if (sortBy === "score_low") return scoreA - scoreB;

          return 0;
        });

        const paginationDiv = document.getElementById("historyPagination");

        if (filtered.length === 0) {
          tbody.innerHTML =
            '<tr><td colspan="6" style="text-align:center; padding: 20px;">No matching exams found.</td></tr>';
          if (paginationDiv) paginationDiv.style.display = "none";
          return;
        }

        const totalPages = Math.ceil(filtered.length / historyItemsPerPage);
        if (currentHistoryPage > totalPages) currentHistoryPage = totalPages;
        if (currentHistoryPage < 1) currentHistoryPage = 1;

        const startIndex = (currentHistoryPage - 1) * historyItemsPerPage;
        const endIndex = startIndex + historyItemsPerPage;
        const paginatedExams = filtered.slice(startIndex, endIndex);

        tbody.innerHTML = paginatedExams
          .map((exam, i) => {
            const actualIndex = startIndex + i + 1;
            const date = new Date(exam.date).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });
            const percentage =
              parseFloat(exam.max_marks) > 0
                ? (
                    (parseFloat(exam.total_marks) /
                      parseFloat(exam.max_marks)) *
                    100
                  ).toFixed(2)
                : "0.00";

            let scoreText = `${percentage}%`;
            if (isNaN(percentage)) scoreText = "0.00%";

            const marks = `${parseFloat(exam.total_marks).toFixed(2)}/${exam.max_marks}`;
            return `
                    <tr>
                        <td>${actualIndex}</td>
                        <td class="hist-title">${exam.title}</td>
                        <td>${date}</td>
                        <td><span class="hist-score">${scoreText}</span></td>
                        <td><span class="hist-marks">${marks}</span></td>
                        <td class="hist-actions">
                            <button class="btn-hist btn-view" onclick="viewExam(${exam.id})">View</button>
                            <button class="btn-hist btn-delete" onclick="deleteExamEntry(${exam.id})">Delete</button>
                        </td>
                    </tr>
                `;
          })
          .join("");

        // Update Pagination Controls
        if (paginationDiv) {
          if (totalPages > 1) {
            paginationDiv.style.display = "flex";
            document.getElementById("historyPageInfo").textContent =
              `Page ${currentHistoryPage} of ${totalPages}`;

            const prevBtn = document.getElementById("prevHistoryPage");
            const nextBtn = document.getElementById("nextHistoryPage");

            prevBtn.disabled = currentHistoryPage === 1;
            prevBtn.style.opacity = currentHistoryPage === 1 ? "0.5" : "1";
            prevBtn.style.cursor =
              currentHistoryPage === 1 ? "not-allowed" : "pointer";

            nextBtn.disabled = currentHistoryPage === totalPages;
            nextBtn.style.opacity =
              currentHistoryPage === totalPages ? "0.5" : "1";
            nextBtn.style.cursor =
              currentHistoryPage === totalPages ? "not-allowed" : "pointer";
          } else {
            paginationDiv.style.display = "none";
          }
        }

        // Render Chart
        renderHistoryChart(filtered);
      }

      function renderHistoryChart(exams) {
        const ctx = document.getElementById("historyProgressChart");
        if (!ctx || exams.length === 0) return;

        if (window.historyChart) {
          window.historyChart.destroy();
        }

        // We need to sort chronologically for the chart, even if the table is sorted differently
        const chronologicalExams = [...exams].sort(
          (a, b) => new Date(a.date) - new Date(b.date),
        );
        const recentExams = chronologicalExams; // Show all for readability

        const labels = recentExams.map((e) => {
          const d = new Date(e.date);
          return `${d.getDate()}/${d.getMonth() + 1}`;
        });

        const dataPoints = recentExams.map((e) =>
          parseFloat(e.max_marks) > 0
            ? (
                (parseFloat(e.total_marks) / parseFloat(e.max_marks)) *
                100
              ).toFixed(1)
            : 0,
        );

        const isDark =
          document.documentElement.getAttribute("data-theme") === "dark";
        const textColor = isDark ? "#d8d8e4" : "#333";
        const gridColor = isDark ? "#333" : "#ddd";

        window.historyChart = new Chart(ctx.getContext("2d"), {
          type: "line",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Score %",
                data: dataPoints,
                borderColor: "#95a5a6",
                backgroundColor: "rgba(149, 165, 166, 0.2)",
                borderWidth: 2,
                tension: 0.3,
                fill: true,
                pointBackgroundColor: "#7f8c8d",
                pointRadius: 5,
                pointHoverRadius: 8,
                pointHoverBackgroundColor: "#3498db",
                pointHoverBorderColor: "#fff",
                pointHoverBorderWidth: 2,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            onHover: (event, elements) => {
              ctx.style.cursor = elements.length > 0 ? "pointer" : "default";
            },
            onClick: (event, elements) => {
              if (elements.length > 0) {
                const index = elements[0].index;
                const exam = recentExams[index];
                if (exam && exam.id) {
                  viewExam(exam.id);
                }
              }
            },
            scales: {
              y: {
                min: 0,
                max: 100,
                grid: { color: gridColor },
                ticks: { color: textColor },
              },
              x: {
                grid: { color: gridColor },
                ticks: { color: textColor },
              },
            },
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  title: (tooltipItems) => {
                    const idx = tooltipItems[0].dataIndex;
                    const exam = recentExams[idx];
                    return exam ? exam.title : "";
                  },
                  label: (ctx) => `Score: ${ctx.parsed.y}%`,
                  afterLabel: () => "(Click to view details)",
                },
              },
            },
          },
        });
      }

      // ============================================
      // Subject-Wise Accuracy Radar Chart
      // ============================================
      async function loadSubjectAccuracyChart(examsData = null) {
        try {
          const exams = examsData || (await getExamHistory());
          const ctx = document.getElementById("subjectAccuracyChartCanvas");
          const emptyState = document.getElementById("accuracyChartEmptyState");
          const motivationalMsg = document.getElementById(
            "accuracyMotivationalMsg",
          );

          if (!ctx) return;

          if (!exams || exams.length === 0) {
            ctx.style.display = "none";
            if (emptyState) emptyState.style.display = "flex";
            if (motivationalMsg)
              motivationalMsg.textContent = "Ready to start your preparation?";
            return;
          }

          if (emptyState) emptyState.style.display = "none";
          ctx.style.display = "block";

          // Aggregate data by subject
          const subjectStats = {};

          // Initialize all known subjects to ensure they appear on the radar
          if (typeof GATE_SUBJECTS !== "undefined") {
            GATE_SUBJECTS.forEach((sub) => {
              subjectStats[sub.id] = {
                name: sub.name,
                shortName: sub.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .toUpperCase()
                  .substring(0, 4), // like DBMS, TOC
                icon: sub.icon,
                color: sub.color,
                totalMarksEarned: 0,
                totalMaxMarks: 0,
                examCount: 0,
              };
            });
          }

          // Process exams
          exams.forEach((exam) => {
            const subject =
              typeof detectSubject === "function"
                ? detectSubject(exam.title)
                : null;
            if (subject && subjectStats[subject.id]) {
              const earned = parseFloat(exam.total_marks);
              const max = parseFloat(exam.max_marks);

              if (!isNaN(earned) && !isNaN(max) && max > 0) {
                subjectStats[subject.id].totalMarksEarned += earned;
                subjectStats[subject.id].totalMaxMarks += max;
                subjectStats[subject.id].examCount += 1;
              }
            }
          });

          // Prepare Chart Data
          const labels = [];
          const dataPoints = [];
          const bgColors = [];
          const borderColors = [];

          let weakestSubject = null;
          let lowestAcc = 101; // higher than max possible 100

          // Filter out subjects with 0 exams to keep the chart clean,
          // but if we have fewer than 3 subjects with data, we might need a simple bar chart or keep them
          Object.values(subjectStats).forEach((stat) => {
            if (stat.examCount > 0) {
              // We use the short name to save space on the radar chart
              labels.push(stat.shortName || stat.name);

              // Calculate average accuracy
              let acc = 0;
              if (stat.totalMaxMarks > 0) {
                acc = (stat.totalMarksEarned / stat.totalMaxMarks) * 100;
                // Clamp to 0 in case of negative marks overriding
                if (acc < 0) acc = 0;
              }
              dataPoints.push(acc.toFixed(1));
              bgColors.push(stat.color + "40"); // 40 is hex for 25% opacity
              borderColors.push(stat.color);

              if (acc < lowestAcc) {
                lowestAcc = acc;
                weakestSubject = stat;
              }
            }
          });

          // Use a clean horizontal bar chart for the sidebar space
          const chartType = "bar";

          // Set motivational text
          if (motivationalMsg) {
            const isDark =
              document.documentElement.getAttribute("data-theme") === "dark";
            if (weakestSubject && labels.length > 0) {
              motivationalMsg.innerHTML = `💪 Focus on <span style="color: ${weakestSubject.color}; font-weight: bold;">${weakestSubject.name}</span> — you can improve!`;
              motivationalMsg.style.background = isDark
                ? `${weakestSubject.color}15`
                : `${weakestSubject.color}15`;
            } else if (labels.length > 0) {
              motivationalMsg.textContent = "Keep up the great work! 🌟";
            } else {
              ctx.style.display = "none";
              if (emptyState) {
                emptyState.style.display = "flex";
                emptyState.innerHTML =
                  "Take some subject-specific exams to see your accuracy!";
              }
              motivationalMsg.textContent = "No subject data yet.";
              return;
            }
          }

          if (window.subjectAccuracyChart) {
            window.subjectAccuracyChart.destroy();
          }

          const isDark =
            document.documentElement.getAttribute("data-theme") === "dark";
          const gridColor = isDark
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(0, 0, 0, 0.1)";
          const textColor = isDark ? "#d8d8e4" : "#666";

          // Configure chart options based on type
          const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: (ctx) => ` Accuracy: ${ctx.raw}%`,
                },
              },
            },
          };

          chartOptions.indexAxis = "y";
          chartOptions.scales = {
            x: {
              min: 0,
              max: 100,
              grid: { color: gridColor },
              ticks: { color: textColor, font: { size: 10 } },
            },
            y: {
              grid: { display: false },
              ticks: { color: textColor, font: { size: 10, weight: "bold" } },
            },
          };

          window.subjectAccuracyChart = new Chart(ctx.getContext("2d"), {
            type: chartType,
            data: {
              labels: labels,
              datasets: [
                {
                  label: "Accuracy %",
                  data: dataPoints,
                  backgroundColor: bgColors,
                  borderColor: borderColors,
                  borderWidth: 1,
                  borderRadius: 4,
                },
              ],
            },
            options: chartOptions,
          });
        } catch (e) {
          console.error("Error loading subject accuracy chart:", e);
        }
      }

      // ============================================
      // Daily Streak & GATE Countdown Logic
      // ============================================
      function initHomeFeatures() {
        // 1. GATE 2027 Countdown (Target: Feb 1, 2027)
        const targetDate = new Date("2027-02-01T00:00:00").getTime();
        const countdownEl = document.getElementById("gateCountdownDisplay");

        function updateCountdown() {
          const now = new Date().getTime();
          const diff = targetDate - now;

          if (diff <= 0) {
            countdownEl.textContent = "It's Exam Day!";
            return;
          }

          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          );
          countdownEl.textContent = `${days}d ${hours}h`;
        }

        updateCountdown();
        setInterval(updateCountdown, 1000 * 60 * 60); // Update every hour is enough for "days + hours"

        // 2. GATE 2027 Calendar Logic
        function loadGateCalendar() {
          const container = document.getElementById("gateCalendarContainer");
          if (!container) return;

          // Set to the 1st of the month immediately to prevent the 31st-to-30th rollover bug
          let currentGateCalDate = new Date();
          currentGateCalDate.setDate(1);

          // Use Event Delegation: Attach ONE event listener to the container
          container.addEventListener("click", (e) => {
            if (e.target.id === "gateCalPrevBtn") {
              currentGateCalDate.setMonth(currentGateCalDate.getMonth() - 1);
              renderGateCalendar(currentGateCalDate);
            } else if (e.target.id === "gateCalNextBtn") {
              currentGateCalDate.setMonth(currentGateCalDate.getMonth() + 1);
              renderGateCalendar(currentGateCalDate);
            }
          });

          function renderGateCalendar(dateObj) {
            const year = dateObj.getFullYear();
            const month = dateObj.getMonth();

            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();

            // Calculate "today" variables ONCE outside the loop
            const today = new Date();
            const todayYear = today.getFullYear();
            const todayMonth = today.getMonth();
            const todayDate = today.getDate();

            // Midnight today for easy past/future comparison
            const todayMidnightTime = new Date(
              todayYear,
              todayMonth,
              todayDate,
            ).getTime();

            const monthNames = [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ];

            let html = `
            <div class="calendar-nav">
                <button class="cal-nav-btn" id="gateCalPrevBtn">&lt;</button>
                <span style="font-size: 14px;">${monthNames[month]} ${year}</span>
                <button class="cal-nav-btn" id="gateCalNextBtn">&gt;</button>
            </div>
            <div class="streak-calendar">
                <div class="calendar-header-day">S</div>
                <div class="calendar-header-day">M</div>
                <div class="calendar-header-day">T</div>
                <div class="calendar-header-day">W</div>
                <div class="calendar-header-day">T</div>
                <div class="calendar-header-day">F</div>
                <div class="calendar-header-day">S</div>
        `;

            // Empty slots
            for (let i = 0; i < firstDay; i++) {
              html += `<div></div>`;
            }

            // Days loop
            for (let day = 1; day <= daysInMonth; day++) {
              const currentIterTime = new Date(year, month, day).getTime();

              // Simple integer comparison is faster than string building
              const isToday =
                year === todayYear && month === todayMonth && day === todayDate;
              const isPast = currentIterTime < todayMidnightTime;

              let classes = "calendar-day";
              if (isToday) classes += " today";
              if (isPast) classes += " crossed-out";

              html += `<div class="${classes}">${day}</div>`;
            }

            html += `</div>`;
            container.innerHTML = html;
          }

          renderGateCalendar(currentGateCalDate);
        }

        loadGateCalendar();

        // // 2. GATE 2027 Calendar Logic
        // function loadGateCalendar() {
        //     let currentGateCalDate = new Date(); // Start with current month

        //     function renderGateCalendar(dateObj) {
        //         const container = document.getElementById('gateCalendarContainer');
        //         if (!container) return;

        //         const year = dateObj.getFullYear();
        //         const month = dateObj.getMonth();

        //         const firstDay = new Date(year, month, 1).getDay();
        //         const daysInMonth = new Date(year, month + 1, 0).getDate();
        //         const today = new Date();
        //         const todayDateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

        //         const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        //         let html = `
        //                 <div class="calendar-nav">
        //                     <button class="cal-nav-btn" id="gateCalPrevBtn">&lt;</button>
        //                     <span style="font-size: 14px;">${monthNames[month]} ${year}</span>
        //                     <button class="cal-nav-btn" id="gateCalNextBtn">&gt;</button>
        //                 </div>
        //                 <div class="streak-calendar">
        //                     <div class="calendar-header-day">S</div>
        //                     <div class="calendar-header-day">M</div>
        //                     <div class="calendar-header-day">T</div>
        //                     <div class="calendar-header-day">W</div>
        //                     <div class="calendar-header-day">T</div>
        //                     <div class="calendar-header-day">F</div>
        //                     <div class="calendar-header-day">S</div>
        //             `;

        //         // Empty slots
        //         for (let i = 0; i < firstDay; i++) {
        //             html += `<div></div>`;
        //         }

        //         for (let day = 1; day <= daysInMonth; day++) {
        //             const currentIterDate = new Date(year, month, day);
        //             const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        //             const isToday = (dateStr === todayDateStr);

        //             // Check if the day has passed (ignoring time)
        //             const isPast = currentIterDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());

        //             let classes = 'calendar-day';
        //             if (isToday) classes += ' today';
        //             if (isPast) classes += ' crossed-out';

        //             html += `<div class="${classes}">${day}</div>`;
        //         }

        //         html += `</div>`;
        //         container.innerHTML = html;

        //         document.getElementById('gateCalPrevBtn').addEventListener('click', () => {
        //             currentGateCalDate.setMonth(currentGateCalDate.getMonth() - 1);
        //             renderGateCalendar(currentGateCalDate);
        //         });

        //         document.getElementById('gateCalNextBtn').addEventListener('click', () => {
        //             currentGateCalDate.setMonth(currentGateCalDate.getMonth() + 1);
        //             renderGateCalendar(currentGateCalDate);
        //         });
        //     }

        //     renderGateCalendar(currentGateCalDate);
        // }

        // loadGateCalendar();

        // 3. Daily Streak Logic
        const streakEl = document.getElementById("streakCountDisplay");

        // Calendar Rendering & Streak logic
        async function loadCalendar() {
          try {
            await initDB();
            const history = await getExamHistory();

            // Collect all unique dates in YYYY-MM-DD local format for active streak days
            const activeDates = new Set();
            history.forEach((ex) => {
              if (ex.date) {
                const d = new Date(ex.date);
                const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
                activeDates.add(dateStr);
              }
            });

            // Collect all unique dates that have To-Dos
            const allTodos = await getAllTodos();
            const todoDates = new Set();
            allTodos.forEach((todo) => {
              if (todo.targetDate) {
                todoDates.add(todo.targetDate);
              }
            });

            // Calculate Current Streak
            let calculatedStreak = 0;
            const today = new Date();

            // Start checking from today backwards
            let checkDate = new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate(),
            );

            while (true) {
              const dateStr = `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, "0")}-${String(checkDate.getDate()).padStart(2, "0")}`;

              // If today is not in activeDates, but yesterday is, streak still counts (haven't played today yet)
              if (calculatedStreak === 0 && !activeDates.has(dateStr)) {
                // It's today, we check yesterday
                checkDate.setDate(checkDate.getDate() - 1);
                const yesterdayStr = `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, "0")}-${String(checkDate.getDate()).padStart(2, "0")}`;
                if (!activeDates.has(yesterdayStr)) {
                  break; // No streak
                }
                // If yesterday has activity, we start streak from yesterday
              } else if (activeDates.has(dateStr)) {
                calculatedStreak++;
                checkDate.setDate(checkDate.getDate() - 1);
              } else {
                break; // Streak broken
              }
            }

            streakEl.textContent = `${calculatedStreak} Day${calculatedStreak !== 1 ? "s" : ""}`;

            // Save it for reference if needed elsewhere
            localStorage.setItem(
              "dailyStreakCount",
              calculatedStreak.toString(),
            );

            let currentCalDate = new Date(); // Start with current month

            function renderCalendar(dateObj) {
              const container = document.getElementById(
                "streakCalendarContainer",
              );
              if (!container) return;

              const year = dateObj.getFullYear();
              const month = dateObj.getMonth();

              const firstDay = new Date(year, month, 1).getDay();
              const daysInMonth = new Date(year, month + 1, 0).getDate();
              const todayDateStr = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-${String(new Date().getDate()).padStart(2, "0")}`;

              const monthNames = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ];

              let html = `
                            <div class="calendar-nav">
                                <button class="cal-nav-btn" id="calPrevBtn">&lt;</button>
                                <span>${monthNames[month]} ${year}</span>
                                <button class="cal-nav-btn" id="calNextBtn">&gt;</button>
                            </div>
                            <div class="streak-calendar">
                                <div class="calendar-header-day">S</div>
                                <div class="calendar-header-day">M</div>
                                <div class="calendar-header-day">T</div>
                                <div class="calendar-header-day">W</div>
                                <div class="calendar-header-day">T</div>
                                <div class="calendar-header-day">F</div>
                                <div class="calendar-header-day">S</div>
                        `;

              // Empty slots before 1st of month
              for (let i = 0; i < firstDay; i++) {
                html += `<div></div>`;
              }

              for (let day = 1; day <= daysInMonth; day++) {
                const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                const isActive = activeDates.has(dateStr);
                const hasTodos = todoDates.has(dateStr);
                const isToday = dateStr === todayDateStr;

                let classes = "calendar-day";
                if (isActive) classes += " active-day";
                if (isToday) classes += " today";
                if (hasTodos) classes += " has-todos";
                if (dateStr === currentTodoDate) classes += " selected-date"; // highlight selection

                html += `<div class="${classes}" style="cursor: pointer;" onclick="selectTodoDate('${dateStr}')">${day}</div>`;
              }

              html += `</div>`;
              container.innerHTML = html;

              document
                .getElementById("calPrevBtn")
                .addEventListener("click", () => {
                  currentCalDate.setMonth(currentCalDate.getMonth() - 1);
                  renderCalendar(currentCalDate);
                });

              document
                .getElementById("calNextBtn")
                .addEventListener("click", () => {
                  // Don't allow navigating past current month if we don't want to, but it's fine
                  currentCalDate.setMonth(currentCalDate.getMonth() + 1);
                  renderCalendar(currentCalDate);
                });
            }

            renderCalendar(currentCalDate);
          } catch (e) {
            console.warn("Could not load calendar data", e);
          }
        }
        loadCalendar();

        // 3. Custom Exam Builder logic
        let allBkqs = []; // Master unfiltered lists
        let allSms = [];
        let availBkqs = []; // Currently filtered lists
        let availSms = [];

        function updateCustomExamCounts() {
          document.getElementById("availBkq").textContent =
            `Avail: ${availBkqs.length}`;
          document.getElementById("availSm").textContent =
            `Avail: ${availSms.length}`;
          document.getElementById("customBkqInput").max = availBkqs.length;
          document.getElementById("customSmInput").max = availSms.length;
          // Clamp current values to not exceed available
          const bkqInput = document.getElementById("customBkqInput");
          const smInput = document.getElementById("customSmInput");
          if (parseInt(bkqInput.value) > availBkqs.length)
            bkqInput.value = availBkqs.length;
          if (parseInt(smInput.value) > availSms.length)
            smInput.value = availSms.length;
        }

        // Global function called by the subject filter dropdown
        window.filterCustomExamBySubject = function () {
          const subjectFilter = document.getElementById(
            "customSubjectFilter",
          ).value;
          if (subjectFilter === "all") {
            availBkqs = [...allBkqs];
            availSms = [...allSms];
          } else {
            const filterFn = (q) => {
              const detected =
                typeof detectSubject === "function"
                  ? detectSubject(q.examTitle)
                  : null;
              if (subjectFilter === "mixed") return detected === null;
              return detected && detected.id === subjectFilter;
            };
            availBkqs = allBkqs.filter(filterFn);
            availSms = allSms.filter(filterFn);
          }
          updateCustomExamCounts();
        };

        async function loadAvailableQuestions() {
          try {
            await initDB();
            allBkqs = (await getAllBookmarks()) || [];
            allSms = (await getAllSillyMistakes()) || [];
            availBkqs = [...allBkqs];
            availSms = [...allSms];
            updateCustomExamCounts();
          } catch (e) {
            console.warn("Could not load custom exam sources", e);
          }
        }

        loadAvailableQuestions();

        async function generateCustomExamData() {
          const numBkq = Math.min(
            parseInt(document.getElementById("customBkqInput").value) || 0,
            availBkqs.length,
          );
          const numSm = Math.min(
            parseInt(document.getElementById("customSmInput").value) || 0,
            availSms.length,
          );

          if (numBkq === 0 && numSm === 0) {
            alert("Please select at least 1 question to build a custom exam.");
            return null;
          }

          // Optimal selection prioritizing unseen questions using IndexedDB tracking
          const getSelection = async (pool, count, trackerType) => {
            if (count === 0 || pool.length === 0) return [];

            let usedHashes = await getUsedCustomExamHashes(trackerType);
            let unused = pool.filter((q) => !usedHashes.has(q.questionHash));

            // If we need more questions than what's unused, we reset history and pick from full pool
            if (unused.length < count) {
              await clearCustomExamTracker(trackerType);
              usedHashes.clear();
              unused = [...pool];
            }

            // Fisher-Yates shuffle for optimal unbiased randomness
            const shuffleArr = (arr) => {
              for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
              }
              return arr;
            };

            shuffleArr(unused);
            const selected = unused.slice(0, count);

            // Update history in IndexedDB
            await saveUsedCustomExamHashes(
              selected.map((q) => q.questionHash),
              trackerType,
            );

            return selected;
          };

          const selectedBkqs = await getSelection(availBkqs, numBkq, "bkq");
          const selectedSms = await getSelection(availSms, numSm, "sm");

          // Combine and deduplicate (in case same question is in both)
          const allSelected = [...selectedBkqs, ...selectedSms];
          const uniqueQuestions = [];
          const hashes = new Set();

          allSelected.forEach((q) => {
            if (!hashes.has(q.questionHash)) {
              hashes.add(q.questionHash);
              uniqueQuestions.push(q);
            }
          });

          // Final shuffle using Fisher-Yates
          const shuffleFinal = (arr) => {
            for (let i = arr.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr;
          };
          shuffleFinal(uniqueQuestions);

          const subjectSelect = document.getElementById("customSubjectFilter");
          const selectedSubjectText = subjectSelect.options[
            subjectSelect.selectedIndex
          ].text
            .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "")
            .trim(); // Remove emojis

          let examTitlePrefix =
            selectedSubjectText === "All Subjects"
              ? "Custom Mixed"
              : `Custom ${selectedSubjectText}`;

          return {
            title: `${examTitlePrefix} Exam (${uniqueQuestions.length} Qs)`,
            duration: Math.max(10, Math.ceil(uniqueQuestions.length * 3)), // 3 mins per question avg
            sections: [
              {
                name: "Mixed Revision",
                questions: uniqueQuestions.map((q, idx) => ({
                  id: idx + 1,
                  question: q.questionText,
                  type: q.type || "single",
                  options: q.options || [],
                  correct_answer: q.correctAnswer,
                  marks: q.maxMarks || 1,
                  negative_marks: q.negativeMarks || 0,
                  explanation: q.explanation || "",
                })),
              },
            ],
          };
        }

        document
          .getElementById("startCustomExamBtn")
          .addEventListener("click", async () => {
            const numBkq =
              parseInt(document.getElementById("customBkqInput").value) || 0;
            const numSm =
              parseInt(document.getElementById("customSmInput").value) || 0;
            if (numBkq === 0 && numSm === 0) {
              alert(
                "Please select at least 1 question to build a custom exam.",
              );
              return;
            }

            if (!confirm('Exam is starting. Are you ready?')) return;

            if (window.enterFullScreen) window.enterFullScreen();

            const customExamData = await generateCustomExamData();
            if (!customExamData) return;

            // Assign to global examData and initialize directly
            examData = customExamData;
            shuffleExamData();
            initializeQuestionStates();

            toggleHomeView(false);
            document.getElementById("examSection").style.display = "flex";

            startExam();
          });

        const exportBtn = document.getElementById("exportCustomExamBtn");
        if (exportBtn) {
          exportBtn.addEventListener("click", async () => {
            const customExamData = await generateCustomExamData();
            if (!customExamData) return;

            // Create a filename based on the custom exam title
            // Sanitize the title to remove characters not suitable for filenames
            let safeTitle = customExamData.title
              .replace(/[^a-z0-9_-]/gi, "_")
              .replace(/_+/g, "_")
              .toLowerCase();
            const filename = `${safeTitle}.json`;

            const dataStr =
              "data:text/json;charset=utf-8," +
              encodeURIComponent(JSON.stringify(customExamData, null, 2));
            const downloadAnchorNode = document.createElement("a");
            downloadAnchorNode.setAttribute("href", dataStr);
            downloadAnchorNode.setAttribute("download", filename);
            document.body.appendChild(downloadAnchorNode); // required for firefox
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
          });
        }
      }

      // Expose function to update streak when exam is submitted (called from exam_script.js or result_script.js if needed)
      // But better to update it right when the exam finishes and saves to DB.
      // We can just rely on localStorage being updated from result_script.js
      window.addEventListener("storage", (e) => {
        if (e.key === "dailyStreakCount") {
          const currentStreak = parseInt(e.newValue || "0");
          const el = document.getElementById("streakCountDisplay");
          if (el) {
            el.textContent = `${currentStreak} Day${currentStreak !== 1 ? "s" : ""}`;
          }
        }
      });

      async function viewExam(examId) {
        const details = await getExamDetails(examId);
        const exam = allExams.find((e) => e.id === examId); // Use cached data (fix #12)
        if (!exam || details.length === 0) return;

        // Build result data in the same format as live exam results
        const summary = {
          correct: exam.correct,
          incorrect: exam.incorrect,
          unanswered: exam.unanswered,
          totalMarks: exam.total_marks.toFixed(2),
          maxTotalMarks: exam.max_marks.toFixed(2),
          totalQuestions: exam.total_questions,
          timestamp: exam.date,
          title: exam.title,
        };
        const detailsFormatted = details.map((d) => ({
          questionId: d.question_id,
          questionText: d.question_text,
          userAnswer: d.user_answer,
          userAnswerDisplay: (function () {
            if (
              d.type === "nat" ||
              d.type === "numerical" ||
              d.type === "numeric"
            )
              return d.user_answer || "Not Attempted";
            if (
              d.user_answer === null ||
              d.user_answer === undefined ||
              d.user_answer === ""
            )
              return "Not Attempted";
            const arr = Array.isArray(d.user_answer)
              ? d.user_answer
              : [d.user_answer];
            return arr.length > 0
              ? arr
                  .map((idx) =>
                    d.options && d.options[idx] !== undefined
                      ? d.options[idx]
                      : idx,
                  )
                  .join(", ")
              : "Not Attempted";
          })(),
          correctAnswer: d.correct_answer,
          correctAnswerDisplay: Array.isArray(d.correct_answer)
            ? d.correct_answer.join(", ")
            : d.correct_answer,
          status: d.status,
          options: d.options,
          type: d.type,
          explanation: d.explanation,
          timeSpent: d.time_spent,
          marksObtained: d.marks_obtained || 0,
          maxMarks: d.max_marks || 0,
          negativeMarks: d.negative_marks || 0,
          markedForReview: d.marked_for_review || false,
        }));

        // Store and navigate — mark as history view so result page won't re-save
        sessionStorage.setItem(
          "gateExamResults",
          JSON.stringify({
            summary,
            details: detailsFormatted,
            fromHistory: true,
          }),
        );
        window.location.href = "/result";
      }

      async function deleteExamEntry(examId) {
        if (!confirm("Delete this exam from history?")) return;
        await deleteExam(examId);
        await loadHistory();
      }