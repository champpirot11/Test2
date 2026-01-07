import { db, ref, onValue } from './firebase-config.js';

const container = document.getElementById('card-container');
const cardsRef = ref(db, 'cards');

// ฟังก์ชันดึงข้อมูล
onValue(cardsRef, (snapshot) => {
    const data = snapshot.val();
    
    // ลองเช็คใน Console ว่าข้อมูลมาไหม
    console.log("ข้อมูลจาก Firebase:", data);

    container.innerHTML = ''; 

    if (data) {
        Object.keys(data).reverse().forEach(key => {
            const item = data[key];
            const cardHTML = `
                <div class="card">
                    <h3>${item.title || 'ไม่มีหัวข้อ'}</h3>
                    <p>${item.description || 'ไม่มีรายละเอียด'}</p>
                </div>
            `;
            container.innerHTML += cardHTML;
        });
    } else {
        container.innerHTML = '<p>เชื่อมต่อสำเร็จ แต่ยังไม่มีข้อมูลในฐานข้อมูล (cards)</p>';
    }
}, (error) => {
    // ถ้าดึงข้อมูลไม่ได้จะแจ้งเตือนตรงนี้
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
});
