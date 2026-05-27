#!/bin/bash
clear

RED='\033[1;31m'
DARK='\033[0;31m'
NC='\033[0m'

echo -e "${RED}=======================================================${NC}"
echo -e "${RED}   🟥 RUENYAI HUB OSINT TERMINAL RED MATRIX ACTIVE 🟥  ${NC}"
echo -e "${RED}=======================================================${NC}"
sleep 0.5

if [ -f /data/data/com.termux/files/usr/bin/pkg ]; then
    pkg update -y && pkg install nodejs -y
    BIN_DIR="/data/data/com.termux/files/usr/bin"
else
    sudo apt update && sudo apt install -y nodejs npm
    BIN_DIR="/usr/local/bin"
fi

npm install

# ผูกคำสั่งลัดให้ใช้งานได้ทุกที่
echo -e "#!/bin/sh\nnode $(pwd)/exe.js \"\$@\"" > "$BIN_DIR/exe.js"
chmod +x "$BIN_DIR/exe.js"
echo -e "#!/bin/sh\nnode $(pwd)/exe.js \"\$@\"" > "$BIN_DIR/OOPP"
chmod +x "$BIN_DIR/OOPP"
echo -e "#!/bin/sh\nnode $(pwd)/exe.js \"\$@\"" > "$BIN_DIR/OOPP2"
chmod +x "$BIN_DIR/OOPP2"

echo -e "\n${RED}[✓] SUCCESS: โหมดควบคุมสีแดงดำติดตั้งเสร็จสมบูรณ์แล้วค่ะ!${NC}"
