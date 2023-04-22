import { Calbisection } from "./Calbi";
import { CalLinear } from "../ch4/callinear";

test("testcal_bi", () => {
    let cal = Calbisection("x^4-13", 1.5, 2);
    expect(cal.xnew).toBe(1.8988288640975952);  //cal. = ค่าจริงคำตอบที่ต้องการ tobe = ตรงกับ expect ไหม
  });

  test("testcal_linear", () => {
    let cal = CalLinear([10, 15, 20, 30, 40, 50, 60, 70, 80], [5, 9, 15, 18, 22, 30, 35, 38, 43], 9);  //type = obj
    expect(cal.gxnew[0]).toBe(7.126666666666663);
  });