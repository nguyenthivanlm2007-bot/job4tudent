const jobs = [
    {
        title: "Nhân viên phục vụ",
        company: "Quán cà phê ABC",
        location: "Hà Nội",
        salary: "25.000đ/giờ",
        type: "parttime",
        typeText: "Bán thời gian",
        description: "Phục vụ khách hàng, nhận order và hỗ trợ công việc tại quán."
    },

    {
        title: "Cộng tác viên Marketing",
        company: "Công ty XYZ",
        location: "Hà Nội",
        salary: "3 - 5 triệu/tháng",
        type: "parttime",
        typeText: "Bán thời gian",
        description: "Hỗ trợ viết nội dung, quản lý mạng xã hội và các hoạt động marketing."
    },

    {
        title: "Thực tập sinh IT",
        company: "Tech Việt",
        location: "Hà Nội",
        salary: "Hỗ trợ thực tập",
        type: "intern",
        typeText: "Thực tập",
        description: "Tham gia các dự án công nghệ và học hỏi kinh nghiệm từ đội ngũ IT."
    },

    {
        title: "Gia sư Toán",
        company: "Trung tâm ABC",
        location: "Hà Nội",
        salary: "100.000đ/buổi",
        type: "parttime",
        typeText: "Bán thời gian",
        description: "Dạy Toán cho học sinh theo chương trình phổ thông."
    },

    {
        title: "Cộng tác viên Online",
        company: "Job4Student",
        location: "Online",
        salary: "Theo năng lực",
        type: "online",
        typeText: "Online",
        description: "Làm việc online, thời gian linh hoạt, phù hợp với sinh viên."
    },

    {
        title: "Thực tập sinh Nhân sự",
        company: "ABC Group",
        location: "Hà Nội",
        salary: "3 triệu/tháng",
        type: "intern",
        typeText: "Thực tập",
        description: "Hỗ trợ tuyển dụng, quản lý hồ sơ và các công việc nhân sự."
    }
];

let currentType = "all";
let currentJob = null;


function renderJobs(list = jobs) {

    const jobList = document.getElementById("jobList");

    if (!jobList) return;

    jobList.innerHTML = "";

    if (list.length === 0) {

        jobList.innerHTML =
            "<p>Không tìm thấy việc làm phù hợp.</p>";

        return;
    }

    list.forEach((job, index) => {

        jobList.innerHTML += `
            <div class="job-card">

                <h3>${job.title}</h3>

                <p>🏢 ${job.company}</p>

                <p>📍 ${job.location}</p>

                <p>💰 ${job.salary}</p>

                <p>💼 ${job.typeText}</p>

                <button onclick="showJobDetail(${index})">
                    Xem chi tiết
                </button>

            </div>
        `;
    });
}


function filterJobs(type) {

    currentType = type;

    if (type === "all") {

        renderJobs(jobs);

        return;
    }

    const result = jobs.filter(job => job.type === type);

    renderJobs(result);
}


function searchJobs() {

    const keyword =
        document.getElementById("searchInput")
        .value
        .toLowerCase()
        .trim();

    const location =
        document.getElementById("locationInput")
        .value
        .toLowerCase()
        .trim();

    let result = jobs;

    if (keyword !== "") {

        result = result.filter(job =>
            job.title.toLowerCase().includes(keyword) ||
            job.company.toLowerCase().includes(keyword) ||
            job.description.toLowerCase().includes(keyword)
        );
    }

    if (location !== "") {

        result = result.filter(job =>
            job.location.toLowerCase().includes(location)
        );
    }

    renderJobs(result);

    document.getElementById("jobs")
        .scrollIntoView({ behavior: "smooth" });
}


function showJobDetail(index) {

    currentJob = jobs[index];

    document.getElementById("detailTitle").textContent =
        currentJob.title;

    document.getElementById("detailCompany").textContent =
        "🏢 " + currentJob.company;

    document.getElementById("detailLocation").textContent =
        "📍 " + currentJob.location;

    document.getElementById("detailSalary").textContent =
        "💰 " + currentJob.salary;

    document.getElementById("detailType").textContent =
        "💼 " + currentJob.typeText;

    document.getElementById("detailDescription").textContent =
        currentJob.description;

    document.getElementById("jobDetailModal")
        .style.display = "flex";
}


function closeJobDetail() {

    document.getElementById("jobDetailModal")
        .style.display = "none";
}


document.getElementById("detailApplyButton")
    .onclick = function () {

        if (!currentJob) return;

        closeJobDetail();

        applyJob(currentJob.title);
    };


function openLogin() {

    document.getElementById("loginModal")
        .style.display = "flex";
}


function closeLogin() {

    document.getElementById("loginModal")
        .style.display = "none";
}


function openRegister() {

    closeLogin();

    document.getElementById("registerModal")
        .style.display = "flex";
}


function closeRegister() {

    document.getElementById("registerModal")
        .style.display = "none";
}


function registerUser() {

    const name =
        document.getElementById("registerName").value.trim();

    const email =
        document.getElementById("registerEmail").value.trim();

    const password =
        document.getElementById("registerPassword").value;

    if (!name || !email || !password) {

        alert("Vui lòng nhập đầy đủ thông tin.");

        return;
    }

    localStorage.setItem("studentName", name);
    localStorage.setItem("studentEmail", email);
    localStorage.setItem("studentPassword", password);

    alert("Đăng ký thành công!");

    closeRegister();

    openLogin();
}


function loginUser() {

    const email =
        document.getElementById("loginEmail").value.trim();

    const password =
        document.getElementById("loginPassword").value;

    const savedEmail =
        localStorage.getItem("studentEmail");

    const savedPassword =
        localStorage.getItem("studentPassword");

    const name =
        localStorage.getItem("studentName");

    if (
        email === savedEmail &&
        password === savedPassword
    ) {

        alert("Xin chào " + name + "! Đăng nhập thành công.");

        closeLogin();

    } else {

        alert("Email hoặc mật khẩu chưa đúng.");
    }
}


function applyJob(title) {

    document.getElementById("applyJobTitle")
        .textContent = "Đang ứng tuyển: " + title;

    document.getElementById("applyModal")
        .style.display = "flex";
}


function closeApply() {

    document.getElementById("applyModal")
        .style.display = "none";
}


function submitApplication() {

    const name =
        document.getElementById("applyName").value.trim();

    const email =
        document.getElementById("applyEmail").value.trim();

    const phone =
        document.getElementById("applyPhone").value.trim();

    if (!name || !email || !phone) {

        alert("Vui lòng nhập đầy đủ thông tin.");

        return;
    }

    alert(
        "Ứng tuyển thành công!\n\n" +
        "Nhà tuyển dụng sẽ liên hệ với bạn."
    );

    closeApply();

    document.getElementById("applyName").value = "";
    document.getElementById("applyEmail").value = "";
    document.getElementById("applyPhone").value = "";
    document.getElementById("applyMessage").value = "";
}


window.onclick = function(event) {

    const modals =
        document.querySelectorAll(".modal");

    modals.forEach(modal => {

        if (event.target === modal) {

            modal.style.display = "none";
        }
    });
};


renderJobs();