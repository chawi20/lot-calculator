// --- ส่วนอ้างอิงถึง Element ในหน้า HTML ---
const balanceInput = document.getElementById('balance');
const riskInput = document.getElementById('risk');
const stoplossInput = document.getElementById('stoploss');
const calculateBtn = document.getElementById('calculateBtn');
const resultLotDisplay = document.getElementById('resultLot');
const riskAmountText = document.getElementById('riskAmountText');

// --- ฟังก์ชันหลักในการคำนวณ ---
function calculateLotSize() {
    // 1. ดึงค่าจากฟอร์มมาแปลงเป็นตัวเลข
    const balance = parseFloat(balanceInput.value);
    const riskPercent = parseFloat(riskInput.value);
    const stopLossPips = parseFloat(stoplossInput.value);

    // 2. ตรวจสอบว่าผู้ใช้กรอกข้อมูลครบถ้วนและถูกต้อง
    if (isNaN(balance) || isNaN(riskPercent) || isNaN(stopLossPips) || balance <= 0 || stopLossPips <= 0) {
        alert("กรุณากรอกข้อมูล เงินทุน, ความเสี่ยง และ Stop Loss ให้เป็นตัวเลขที่มากกว่า 0");
        return;
    }

    // 3. คำนวณตามสูตร
    const riskAmount = balance * (riskPercent / 100);
    const pipValuePerLot = 10;
    const lotSize = riskAmount / (stopLossPips * pipValuePerLot);

    // ⭐️ --- ส่วนที่อัปเกรด --- ⭐️
    // ตรวจสอบว่า Lot ที่คำนวณได้ต่ำกว่าขั้นต่ำ (0.01) หรือไม่
    if (lotSize < 0.01) {
        // ถ้าใช่ ให้แสดงข้อความเตือน
        resultLotDisplay.textContent = "ต่ำกว่า 0.01";
        riskAmountText.textContent = "เงินทุนน้อยไป หรือ SL กว้างเกินไปสำหรับความเสี่ยงนี้";
    } else {
        // ถ้าไม่ (มากกว่าหรือเท่ากับ 0.01) ก็แสดงผลตามปกติ
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