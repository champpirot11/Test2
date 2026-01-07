// admin.js
import { db, ref, push } from './firebase-config.js'; // เช็คชื่อไฟล์ตรงนี้ให้ดี

const cardForm = document.getElementById('cardForm');

cardForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    // ลองใส่ console.log เพื่อเช็คว่าฟังก์ชันทำงานไหม
    console.log("กำลังส่งข้อมูล...", { title, description });

    push(ref(db, 'cards'), {
        title: title,
        description: description,
        createdAt: Date.now() 
    }).then(() => {
        alert("บันทึกออนไลน์สำเร็จ!");
        cardForm.reset();
    }).catch((error) => {
        console.error("Firebase Error:", error);
        alert("เกิดข้อผิดพลาด: " + error.message);
    });
});
