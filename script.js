import { db, ref, onValue, remove } from './firebase-config.js';

const container = document.getElementById('card-container');
const cardsRef = ref(db, 'cards');

onValue(cardsRef, (snapshot) => {
    const data = snapshot.val();
    container.innerHTML = ''; 

    if (data) {
        Object.keys(data).reverse().forEach(key => {
            const item = data[key];
            
            // จัดรูปแบบวันที่ (ถ้าไม่มีใน Database จะใช้วันที่ปัจจุบันแทนชั่วคราว)
            const dateStr = item.createdAt ? new Date(item.createdAt).toLocaleDateString('th-TH', {
                year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
            }) : 'ไม่มีข้อมูลวันที่';

            const cardHTML = `
                <div class="card">
                    <span class="card-date">📅 ${dateStr}</span>
                    <h3>${item.title || 'ไม่มีหัวข้อ'}</h3>
                    <p>${item.description || 'ไม่มีรายละเอียด'}</p>
                    <button class="delete-btn" onclick="deleteCard('${key}')">ลบการ์ดนี้</button>
                </div>
            `;
            container.innerHTML += cardHTML;
        });
    } else {
        container.innerHTML = '<p>ยังไม่มีข้อมูลในระบบ</p>';
    }
});

// ฟังก์ชันลบข้อมูล
window.deleteCard = (key) => {
    if (confirm("คุณแน่ใจหรือไม่ที่จะลบข้อมูลนี้?")) {
        const itemRef = ref(db, `cards/${key}`);
        remove(itemRef).then(() => {
            console.log("Deleted successfully");
        }).catch((error) => {
            alert("เกิดข้อผิดพลาดในการลบ: " + error.message);
        });
    }
};
