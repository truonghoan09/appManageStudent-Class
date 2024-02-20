// Tạo ra để có thể nhận vào một schedule và trả về một schedule mới update realtime mỗi 500ms

const caculateLessonRealtime = async(schedule) => {
    const now = new Date();
    let scheduleUpdated = {
        fixed: true,
        nextLessons: undefined,
        lessonAtNow: undefined,
        enRoute: false,
        fixedSchedule: undefined,
        note: '',
    }
    let cloneNextLessons = [];
    let cloneFixedSchedule = [];
    let reSult = [];
    if(schedule) {
        scheduleUpdated.fixed = schedule.fixed;
        scheduleUpdated.note = schedule.note;
        scheduleUpdated.enRoute = schedule.enRoute;
        if(schedule.fixed) {
            cloneFixedSchedule = [...schedule.fixedSchedule]

            cloneFixedSchedule.map((v, i) => {
                if ((new Date(v.date) - v.travelTime) > now) {
                    reSult.push(v);
                }
                if(((new Date(v.date)) - v.travelTime < now ) && ((new Date(v.dateEnd)) > now)) {
                    lessonAtNow = v;
                }
            })
        } else {
            if(schedule.nextLessons) {
                cloneNextLessons = [...schedule.nextLessons];
                
                cloneNextLessons.map((v, i) => {
                    if ((new Date(v.date) - v.travelTime) > now) {
                        reSult.push(v);
                    }
                    if(((new Date(v.date)) - v.travelTime < now ) && ((new Date(v.dateEnd)) > now)) {
                        scheduleUpdated.lessonAtNow = v;
                        if(new Date(v.date) > now) {
                            scheduleUpdated.enRoute = true;
                        }
                    }
                })
                if(reSult.length > 0) {
                    scheduleUpdated.nextLessons = await reSult.sort((a,b) => {return (new Date(a.date)) - (new Date(b.date))});
                }
            }
        }
        if(schedule.lessonAtNow && !scheduleUpdated.lessonAtNow) {
            let lessonNow = schedule.lessonAtNow;
            
            if (now > new Date(lessonNow.dateEnd)) {
                scheduleUpdated.lessonAtNow = undefined;
            } else {
                if (new Date(lessonNow.date) > now) {
                    scheduleUpdated.enRoute = true;
                } else {
                    scheduleUpdated.enRoute = false;
                }
                scheduleUpdated.lessonAtNow = lessonNow;
            }
        }
    }
    return(scheduleUpdated);
}

export default caculateLessonRealtime

