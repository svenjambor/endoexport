
require('cross-fetch/polyfill');
const fs = require('fs');
const { Api } = require('endomondo-api-handler');
const math = require('mathjs');
const sec = math.sec;

const user = process.env.ENDO_USER;
const secret = process.env.ENDO_PASS;
const filepath = process.env.ENDO_PATH.replace(/\/+$/, '');

if (!fs.existsSync(filepath)){
     fs.mkdirSync(filepath);
   }

const dateFormat = "yyyyMMdd'-'HHmm";

const api = new Api();

(async () => {
    await api.login(user, secret);

    await api.processWorkouts({}, async (workout) => {
        if (workout.hasGPSData()) {
              startTimestamp = workout.getStart().toFormat(dateFormat);
              workoutType = workout.getSportName();

              if (workout.distance === undefined || workout.distance === null) {
                distance = 0;
              } else {
                distance = math.round(workout.distance.value/1000,2);
              };

              if (workout.duration === undefined || workout.duration === null) {
                duration = "0s";
              } else {
                duration = new Date(workout.duration.values.seconds*1000).toISOString().substr(11,8).replace(":","h").replace("00h","").replace(":","m")+"s";
              };
              
              calories = workout.source.calories;
              if (calories === undefined || calories === null) {
                calories = 0;
              };

              filestring = `${startTimestamp} ${workoutType} ${distance}km for ${duration} (${calories}kcal)`;
              console.log(filestring);
              fs.writeFileSync(`${filepath}/${filestring}.gpx`, await api.getWorkoutGpx(workout.getId()), 'utf8');
        }
    });
})();