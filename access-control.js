// This script checks Supabase settings and hides/disables buttons
// Include this in your student-facing pages

const AC_SUPABASE_URL = 'https://ewpmkjqcjnhtxyfqgiba.supabase.co';
const AC_SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3cG1ranFjam5odHh5ZnFnaWJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzMTUyOTMsImV4cCI6MjA3Nzg5MTI5M30.i1ivEtua8fCktdit_DASxQigFg2Kb8NLn0WLLQ3LFmI';
const acSupabase = window.supabase.createClient(AC_SUPABASE_URL, AC_SUPABASE_KEY);

async function checkAccessControl() {
    // 1. Identify current user role
    const role = localStorage.getItem('mgmtUserRole');
    // Officials (Admins/Mentors) bypass these checks
    if (role === 'admin' || role === 'mentor' || role === 'chief_admin' || role === 'official') {
        return; 
    }

    // 2. Fetch settings from Supabase
    const { data: settings, error } = await acSupabase.from('app_settings').select('key, value');
    
    if (error || !settings) return;

    // 3. Map settings to DOM Elements (IDs of buttons/links)
    // You need to add these IDs to your HTML buttons!
    const elementMap = {
        'bar_view_all_students': 'btnViewAllStudents',
        'bar_add_remove_student': 'btnManageStudents',
        'bar_update_info': 'btnUpdateInfo',
        'bar_change_password': 'btnChangePassword',
        'bar_books_read': ['booksReadBtn', 'editBooksBtn'], // Supports multiple IDs (view & edit)
        'bar_achievements': ['achievementsBtn', 'editAchievementsBtn'],
        'bar_extra_skills': ['extraSkillsBtn', 'editExtraBtn'],
        'bar_exam_progress': ['examProgressBtn', 'editExamBtn']
    };

    settings.forEach(setting => {
        if (setting.value === false) { // If Disabled
            const targetIds = elementMap[setting.key];
            
            if (Array.isArray(targetIds)) {
                targetIds.forEach(id => disableElement(id));
            } else {
                disableElement(targetIds);
            }
        }
    });
}

function disableElement(id) {
    const el = document.getElementById(id);
    if (el) {
        // Option A: Hide completely
        // el.style.display = 'none';

        // Option B: Show as Disabled (Greyed out & unclickable) - User requested "Show Disabled by Admin"
        el.classList.add('disabled', 'btn-secondary');
        el.classList.remove('btn-primary', 'btn-success', 'btn-warning', 'btn-info');
        el.style.opacity = '0.6';
        el.style.cursor = 'not-allowed';
        el.href = 'javascript:void(0)'; // Remove link
        el.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            alert('Disabled by Admin');
            return false;
        };
        // Also change text if you want
        // el.innerText += " (Locked)";
    }
}

// Run on load
document.addEventListener('DOMContentLoaded', checkAccessControl);
```

### Step 4: Update Your HTML Pages (Add IDs and Script)

Now, go to your pages and:
1.  Add `<script src="access-control.js"></script>` at the bottom (after Supabase script).
2.  Add the correct `id="..."` to the buttons you want to control.

**Example 1: `students-info.html`**
```html
<!-- Add IDs to the buttons -->
<a href="view-all-students.html" class="btn btn-primary btn-lg" id="btnViewAllStudents">View Students</a>
<a href="manage-students.html" class="btn btn-success btn-lg" id="btnManageStudents">Manage Students</a>
<a href="update-student-info.html" class="btn btn-warning btn-lg" id="btnUpdateInfo">Update Information</a>
<a href="change-password.html" class="btn btn-info btn-lg" id="btnChangePassword">Change Password</a>

<!-- Add Script at bottom -->
<script src="access-control.js"></script>
```

**Example 2: `edit-student-progress.html` (and `view-student-progress.html`)**
```html
<!-- Add IDs -->
<a href="..." class="btn..." id="editBooksBtn">Edit Books Read</a>
<a href="..." class="btn..." id="editAchievementsBtn">Edit Achievements</a>
<a href="..." class="btn..." id="editExtraBtn">Edit Extra Skills</a>
<button ... id="editExamBtn">Edit Exam Progress</button>

<!-- Add Script -->
<script src="access-control.js"></script>