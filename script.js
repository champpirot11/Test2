// ฟังก์ชันสำหรับดึงข้อมูลและแสดงผล
function loadCards() {
    const container = document.getElementById('card-container');
    
    // 1. ดึงข้อมูลจาก Database
    const database = JSON.parse(localStorage.getItem('myCards')) || [];

    // ล้างข้อความ "กำลังโหลด..." ออก
    container.innerHTML = '';

    // 2. ตรวจสอบว่ามีข้อมูลไหม
    if (database.length === 0) {
        container.innerHTML = '<p>ยังไม่มีข้อมูลในระบบ</p>';
        return;
    }

    // 3. วนลูปสร้าง HTML จากข้อมูลที่มี
    database.forEach(data => {
        const cardHTML = `
            <div class="card">
                <h3>${data.title}</h3>
                <p>${data.description}</p>
            </div>
        `;
        container.innerHTML += cardHTML;
    });
}

// สั่งให้ทำงานทันทีที่เปิดหน้าเว็บ
loadCards();