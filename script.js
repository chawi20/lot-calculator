// --- ส่วนอ้างอิงถึง Element ในหน้า HTML ---
const balanceInput = document.getElementById('balance');
const riskInput = document.getElementById('risk');
const stoplossInput = document.getElementById('stoploss');
const pipValueInput = document.getElementById('pipValue'); // ⭐️ เพิ่มเข้ามาใหม่
const calculateBtn = document.getElementById('calculateBtn');
const resultLotDisplay = document.getElementById('resultLot');
const riskAmountText = document.getElementById('riskAmountText');

// --- ฟังก์ชันหลักในการคำนวณ ---
function calculateLotSize() {
    // 1. ดึงค่าจากฟอร์มมาแปลงเป็นตัวเลข
    const balance = parseFloat(balanceInput.value);
    const riskPercent = parseFloat(riskInput.value);
    const stopLossPips = parseFloat(stoplossInput.value);
    const pipValuePerLot = parseFloat(pipValueInput.value); // ⭐️ เปลี่ยนมาอ่านค่าจาก Input

    // 2. ตรวจสอบว่าผู้ใช้กรอกข้อมูลครบถ้วนและถูกต้อง
    // ⭐️ เพิ่ม pipValuePerLot เข้าไปในเงื่อนไขด้วย
    if (isNaN(balance) || isNaN(riskPercent) || isNaN(stopLossPips) || isNaN(pipValuePerLot) || balance <= 0 || stopLossPips <= 0 || pipValuePerLot <= 0) {
        alert("กรุณากรอกข้อมูลทั้งหมดให้เป็นตัวเลขที่มากกว่า 0");
        return;
    }

    // 3. คำนวณตามสูตร
    const riskAmount = balance * (riskPercent / 100);
    // ⭐️ กำหนดค่า pipValuePerLot เราดึงมาจากฟอร์ม
    const lotSize = riskAmount / (stopLossPips * pipValuePerLot);

    // 4. ตรวจสอบและแสดงผลลัพธ์
    if (lotSize < 0.01) {
        resultLotDisplay.textContent = "ต่ำกว่า 0.01";
        riskAmountText.textContent = "เงินทุนน้อยไป หรือ SL กว้างเกินไปสำหรับความเสี่ยงนี้";
    } else {
        resultLotDisplay.textContent = lotSize.toFixed(2);
        riskAmountText.textContent = `จำนวนเงินที่เสี่ยง: ${riskAmount.toFixed(2)} USD`;
    }
}

// --- สั่งให้ปุ่ม "คำนวณ" ทำงาน ---
if (calculateBtn) {
    calculateBtn.addEventListener('click', calculateLotSize);
} else {
    console.error("หาปุ่ม 'calculateBtn' ไม่เจอ! กรุณาตรวจสอบ ID ในไฟล์ HTML");
}