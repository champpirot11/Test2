import { db, ref, onValue } from './firebase-config.js';

const container = document.getElementById('card-container');
const cardsRef = ref(db, 'cards');

// ฟังก์ชันดึงข้อมูลแบบ Realtime
onValue(cardsRef, (snapshot) => {
    const data = snapshot.val();
    container.innerHTML = ''; // ล้างหน้าจอเก่า (เช่น คำว่า "กำลังโหลด")

    if (data) {
        // วนลูปดึงข้อมูลออกมา (Firebase ส่งข้อมูลมาเป็น Object)
        Object.keys(data).reverse().forEach(key => {
            const item = data[key];
            const cardHTML = `
                <div class="card">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            `;
            container.innerHTML += cardHTML;
        });
    } else {
        container.innerHTML = '<p>ยังไม่มีข้อมูลในฐานข้อมูล</p>';
    }
});
