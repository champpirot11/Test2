const cardForm = document.getElementById('cardForm');

cardForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    const newData = { title, description };

    // --- ส่วนของ Database (LocalStorage) ---
    
    // 1. ดึงข้อมูลเก่าที่มีอยู่ใน Database ออกมาก่อน (ถ้าไม่มีให้เป็น Array ว่าง [])
    let database = JSON.parse(localStorage.getItem('myCards')) || [];

    // 2. เพิ่มข้อมูลใหม่เข้าไปใน Array
    database.push(newData);

    // 3. บันทึกกลับลงไปใน Database (ต้องแปลงเป็น String ก่อนเก็บ)
    localStorage.setItem('myCards', JSON.stringify(database));

    // ---------------------------------------

    alert("บันทึกข้อมูลลง Database เรียบร้อย!");
    cardForm.reset();
});