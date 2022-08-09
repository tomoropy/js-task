const commander = require("commander");

const date = new Date()

function create_calender(month){
  const year = date.getFullYear()
  const startDate = new Date(year, month - 1, 1)
  const endDate = new Date(year, month, 0)
  const endDateCount = endDate.getDate()
  let startDayCount = startDate.getDay() // 月の最初の曜日(数値)を取得

  console.log(`     ${month}月 ${year}年`);
  console.log("日 月 火 水 木 金 土");
  process.stdout.write('   '.repeat(startDayCount));

  for(let i = 1; i < endDateCount + 1; i++){
    process.stdout.write(i.toString().padStart(2) + " ");
    startDayCount++;
    if (startDayCount % 7 === 0) console.log("");
  }
  console.log("");
}

commander.parse(process.argv);
let month = commander.args[0]; // 月をcommander.args配列から取り出す

if(month === undefined){
  month = date.getMonth();
  create_calender(month + 1);
}else if(month >= 1 && month <= 12){
  create_calender(month);
}else if(month > 12){
  console.log("引数は1から12までを指定してください");
}

// # 引数の範囲が正しい場合
// elsif argv.between?(1, 12)
// 	create_calender(argv)

// # 引数が12より大きい場合
// elsif argv > 12
// 	puts 'cal: 22 is neither a month number (1..12) nor a name'
// end
