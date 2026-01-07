import { db, ref, push } from './firebase-config.js';

const cardForm = document.getElementById('cardForm');

cardForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    push(ref(db, 'cards'), {
        title: title,
        description: description,
        createdAt: Date.now() // เพิ่มบรรทัดนี้เพื่อเก็บเวลาปัจจุบัน
    }).then(() => {
        alert("บันทึกออนไลน์สำเร็จ!");
        cardForm.reset();
    });
});
