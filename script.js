import { db, ref, onValue, remove } from './firebase-config.js';

// เปลี่ยนมาชี้ที่ table-body
const tableBody = document.getElementById('table-body');
const cardsRef = ref(db, 'cards');

onValue(cardsRef, (snapshot) => {
    const data = snapshot.val();
    tableBody.innerHTML = ''; 

    if (data) {
        Object.keys(data).reverse().forEach(key => {
            const item = data[key];
            
            const dateStr = item.createdAt ? new Date(item.createdAt).toLocaleDateString('th-TH', {
                year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
            }) : 'ไม่มีข้อมูลวันที่';

            // เปลี่ยนจาก card เป็นแถวตาราง tr
            const rowHTML = `
                <tr>
                    <td class="card-date">${dateStr}</td>
                    <td><strong style="color: var(--text-main)">${item.title || 'ไม่มีหัวข้อ'}</strong></td>
                    <td style="color: var(--text-muted)">${item.description || 'ไม่มีรายละเอียด'}</td>
                    <td>
                        <button class="delete-btn" onclick="deleteCard('${key}')">ลบ</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += rowHTML;
        });
    } else {
        tableBody.innerHTML = '<tr><td colspan="4" style="text-align: center;">ยังไม่มีข้อมูลในระบบ</td></tr>';
    }
});

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
