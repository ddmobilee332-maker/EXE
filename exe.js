import readline from 'readline';
import si from 'systeminformation';
import chalk from 'chalk';
import gradient from 'gradient-string';
import Table from 'cli-table3';
import { osintByUsername, osintByEmail } from './utils.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// กำหนดเฉดสี แดง-ดำ
const redDarkGrad = gradient(['#ff0000', '#990000', '#330000', '#111111']);
const bloodRed = chalk.hex('#ff0000');
const darkGray = chalk.hex('#555555');

async function showDashboard() {
    console.clear();
    
    // โลโก้ใหม่ โหดดุดัน
    const logo = `
    ██████╗ ██╗   ██╗███████╗███╗   ██╗██╗   ██╗ █████╗ ██╗    ██╗  ██╗██╗   ██╗██████╗ 
    ██╔══██╗██║   ██║██╔════╝████╗  ██║╚██╗ ██╔╝██╔══██╗██║    ██║  ██║██║   ██║██╔══██╗
    ██████╔╝██║   ██║█████╗  ██╔██╗ ██║ ╚████╔╝ ███████║██║    ███████║██║   ██║██████╔╝
    ██╔══██╗██║   ██║██╔══╝  ██║╚██╗██║  ╚██╔╝  ██╔══██║██║    ██╔══██║██║   ██║██╔══██╗
    ██║  ██║╚██████╔╝███████╗██║ ╚████║   ██║   ██║  ██║██║    ██║  ██║╚██████╔╝██████╔╝
    ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝╚═╝    ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ 
                      [ RED EDITION - OSINT OVERRIDE TERMINAL ]
    `;
    
    console.log(redDarkGrad(logo));
    console.log(bloodRed(` ╔════════════════════════════════════════════════════════════════════════════════╗`));
    console.log(` ║ ${bloodRed(' [!] SYSTEM CRITICALSTATUS: SYSTEM PENETRATION MODE ENGAGED')}                  ║`);
    console.log(bloodRed(` ╚════════════════════════════════════════════════════════════════════════════════╝\n`));

    // ดึงข้อมูลระบบในเครื่องมาโชว์
    const osInfo = await si.osInfo();
    const cpu = await si.cpu();
    const mem = await si.mem();
    
    // ตารางข้อมูลเครื่อง (ธีมแดง-ขาว-ดำ)
    const sysTable = new Table({
        chars: { 'top': '═' , 'top-mid': '┯' , 'top-left': '┏' , 'top-right': '破坏'
               , 'bottom': '═' , 'bottom-mid': '┷' , 'bottom-left': '┗' , 'bottom-right': '┛'
               , 'left': '┃' , 'left-mid': '┠' , 'mid': '─' , 'mid-mid': '┼'
               , 'right': '┃' , 'right-mid': '┨' , 'middle': '│' },
        head: [bloodRed('🟥 SYSTEM NODE'), bloodRed('🚨 TARGET HARDWARE DATA')],
        colWidths: [25, 55]
    });

    sysTable.push(
        [bloodRed(' OS Platform'), chalk.white(`${osInfo.distro} (${osInfo.arch})`)],
        [bloodRed(' CPU Processor'), chalk.white(`${cpu.brand} @ ${cpu.speed}GHz`)],
        [bloodRed(' Memory Space'), chalk.white(`${(mem.active / 1024 / 1024 / 1024).toFixed(2)} GB / ${(mem.total / 1024 / 1024 / 1024).toFixed(2)} GB`)]
    );
    console.log(sysTable.toString() + '\n');

    // ตารางบอกคำสั่งการใช้งานทั้งหมดตามที่ขอ!!
    const cmdTable = new Table({
        head: [bloodRed('⌨️ COMMAND'), bloodRed('📝 DESCRIPTION (วิธีใช้งาน)')],
        colWidths: [20, 60]
    });
    cmdTable.push(
        [chalk.white('OOPP'), chalk.gray('ค้นหาประวัติโซเชียล (TikTok, IG, YT, FB) จาก "ชื่อจริง" เพื่อดึงอีเมล')],
        [chalk.white('OOPP2'), chalk.gray('ขุดเจาะฐานข้อมูลจาก "อีเมล" เพื่อดึงเบอร์โทรศัพท์และพิกัด IP')],
        [chalk.white('exit'), chalk.gray('ปิดระบบและตัดการเชื่อมต่อทั้งหมด')]
    );
    console.log(bloodRed(' [ ข้อมูลคำสั่งควบคุมระบบ ]'));
    console.log(cmdTable.toString() + '\n');
    
    startCommandPrompt();
}

function startCommandPrompt() {
    rl.question(bloodRed('Ruenyai@RedCore> '), async (input) => {
        const command = input.trim();

        if (command === 'OOPP' || command === 'oopp') {
            triggerUsernameScanner();
        } else if (command === 'OOPP2' || command === 'oopp2') {
            triggerEmailScanner();
        } else if (command === 'exit') {
            console.log(bloodRed('\n🔌 [!] DISCONNECTED FROM RED NODE.'));
            process.exit(0);
        } else {
            console.log(chalk.red(`❌ [ERROR] Unknown Command! ดูตารางคำสั่งด้านบนเพื่อเปิดใช้งาน`));
            startCommandPrompt();
        }
    });
}

// โหมดที่ 1: ค้นหาจากชื่อจริง (OOPP)
function triggerUsernameScanner() {
    console.log(bloodRed('\n 📡 [ OSINT MODE 1 ACTIVE: ค้นหาจากชื่อโปรไฟล์/ชื่อจริง ]'));
    rl.question(chalk.white(' 👤 กรอกชื่อเป้าหมาย -> '), async (username) => {
        if (!username) {
            console.log(chalk.red(' ⚠️ ชื่อห้ามว่าง!'));
            return startCommandPrompt();
        }

        console.log(bloodRed(' ⚡ กำลังดึงข้อมูลจาก TikTok, IG, YouTube, Facebook...'));
        const res = await osintByUsername(username);

        console.log(bloodRed('\n ╔═══════════════════ [ RESULT: SOCIAL DECRYPTED ] ═══════════════════╗'));
        console.log(` ║  ${bloodRed('🎯 TARGET USERNAME :')} ` + chalk.white(res.target));
        console.log(` ║  ${bloodRed('📊 DATABASE MATCH  :')} ` + chalk.yellow(res.databaseMatch));
        console.log(` ║  ${bloodRed('📧 EXTRACTED EMAIL :')} ` + chalk.green(res.extractedEmail));
        console.log(` ║  ${darkGray('🔗 TikTok Link     :')} ` + chalk.gray(res.links.TikTok));
        console.log(` ║  ${darkGray('🔗 Instagram Link  :')} ` + chalk.gray(res.links.Instagram));
        console.log(` ║  ${darkGray('🔗 YouTube Link    :')} ` + chalk.gray(res.links.YouTube));
        console.log(` ║  ${darkGray('🔗 Facebook Link   :')} ` + chalk.gray(res.links.Facebook));
        console.log(bloodRed(' ╚═══════════════════════════════════════════════════════════════════╝\n'));

        startCommandPrompt();
    });
}

// โหมดที่ 2: ค้นหาจากอีเมล (OOPP2)
function triggerEmailScanner() {
    console.log(bloodRed('\n 📡 [ OSINT MODE 2 ACTIVE: ขุดเจาะจากอีเมล ]'));
    rl.question(chalk.white(' 📧 กรอกอีเมลเป้าหมาย -> '), async (email) => {
        if (!email) {
            console.log(chalk.red(' ⚠️ อีเมลห้ามว่าง!'));
            return startCommandPrompt();
        }

        console.log(bloodRed(' ⚡ กำลังเจาะลึกระบบ Data Breach เพื่อค้นหาเบอร์โทรศัพท์และไอพี...'));
        const res = await osintByEmail(email);

        console.log(bloodRed('\n ╔═══════════════════ [ RESULT: EMAIL DECRYPTED ] ═══════════════════╗'));
        console.log(` ║  ${bloodRed('📧 TARGET EMAIL     :')} ` + chalk.white(res.email));
        console.log(` ║  ${bloodRed('🚨 SECURITY RISK    :')} ` + chalk.bgRed.black(` ${res.securityRisk} `));
        console.log(` ║  ${bloodRed('📞 LINKED PHONE NO. :')} ` + chalk.green(res.linkedPhone));
        console.log(` ║  ${bloodRed('📍 ESTIMATED LOC    :')} ` + chalk.white(res.estimatedLocation));
        console.log(` ║  ${bloodRed('🛰️  CONNECTED IP     :')} ` + chalk.cyan(res.linkedIP));
        console.log(` ║  ${darkGray('🌐 NETWORK ISP      :')} ` + chalk.gray(res.isp));
        console.log(bloodRed(' ╚═══════════════════════════════════════════════════════════════════╝\n'));

        startCommandPrompt();
    });
}

showDashboard();
         
