export async function osintByUsername(username) {
    // จำลองการใช้เวลาขุดข้อมูล 2 วินาทีเพื่อให้ดูสมจริง
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // สุ่มสร้างอีเมลจำลองที่ผูกกับชื่อนั้นๆ
    const platforms = ['TikTok', 'Instagram', 'YouTube', 'Facebook'];
    const domains = ['gmail.com', 'yahoo.com', 'outlook.com'];
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];
    
    // ทำให้อีเมลดูเหมือนถูกขุดพบจริงๆ
    const maskedEmail = `${username.toLowerCase()}${Math.floor(Math.random() * 90 + 10)}@${randomDomain}`;

    return {
        status: 'SUCCESS',
        target: username,
        foundCount: 4,
        links: {
            TikTok: `https://tiktok.com/@${username}`,
            Instagram: `https://instagram.com/${username}`,
            YouTube: `https://youtube.com/@${username}`,
            Facebook: `https://facebook.com/${username}`
        },
        extractedEmail: maskedEmail,
        databaseMatch: 'MATCH FOUND IN 2026 BREACH DATABASE'
    };
}

export async function osintByEmail(email) {
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // จำลองเบอร์โทรศัพท์ที่หลุดออกมา
    const randomPhone = `08${Math.floor(Math.random() * 9 + 1)}-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`;
    const ipAddresses = ['103.22.183.45', '171.96.22.101', '49.228.99.12'];
    
    return {
        status: 'BREACH DETECTED',
        email: email,
        linkedPhone: randomPhone,
        estimatedLocation: 'Bangkok, Thailand',
        isp: 'AIS / TrueMove H (Simulated)',
        linkedIP: ipAddresses[Math.floor(Math.random() * ipAddresses.length)],
        securityRisk: 'CRITICAL HIGH (89%)'
    };
}
