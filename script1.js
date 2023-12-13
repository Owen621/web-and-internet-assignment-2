let str = '';
for (let i=0; i<10; i++) {
    roll = 1+Math.floor(Math.random()*6);
    str+= `<b>${roll}</b> `;
}
document.write(str);

