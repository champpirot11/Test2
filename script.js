import { db, ref, onValue } from './firebase-config.js';

const container = document.getElementById('card-container');
const cardsRef = ref(db, 'cards');

onValue(cardsRef, (snapshot) => {
    const data = snapshot.val();
    console.log("ข้อมูลจาก Firebase:", data); // ตรวจสอบใน Console
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
        container.innerHTML = '<p>เชื่อมต่อสำเร็จ แต่ยังไม่มีข้อมูลในฐานข้อมูล</p>';
    }
}, (error) => {
    console.error("เกิดข้อผิดพลาด:", error);
});
