import { db, ref, push } from './firebase-config.js';

const cardForm = document.getElementById('cardForm');

cardForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    // บันทึกลง Firebase (แทนที่ LocalStorage)
    push(ref(db, 'cards'), {
        title: title,
        description: description
    }).then(() => {
        alert("บันทึกออนไลน์สำเร็จ!");
        cardForm.reset();
    });
});