export function addTimes(t1, t2){
    const [h1, m1, s1] = t1.split(':').map(Number);
    const [h2, m2, s2] = t2.split(':').map(Number);
    let seconds = s1 + s2;
    let minutes = m1 + m2 + Math.floor(seconds / 60);
    seconds %= 60;
    let hours = h1 + h2 + Math.floor(minutes / 60);
    minutes %= 60;
    return [hours, minutes, seconds]
     .map( v => v.toString().padStart(2, "0"))
     .join(':');
}


export function toSeconds(t){
    const [h, m, s] = t.split(':').map(Number);
    return h * 3600 + m * 60 + s;
}

export function formatHMS(secTotal){
    const hours = Math.floor(secTotal / 3600);
    const minutes = Math.floor((secTotal % 3600) / 60);
    const seconds = secTotal % 60;
    return [hours, minutes, seconds]
        .map(v => v.toString().padStart(2, '0'))
        .join(':');
}

