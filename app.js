function solve() {
   document.querySelector('#btnSend').addEventListener('click', onClick);
   let input = document.querySelector(`#inputs>textarea`);
   let bestRestarurantP = document.querySelector(`#bestRestaurant>p`);
   let workerP = document.querySelector(`#workers>p`);
   function onClick() {
      let arr = JSON.parse(input.value);

      let restaurants = {};

      arr.forEach((line) => {
         let tokens = line.split(` - `)
         let name = tokens[0];
         let workersArr = tokens[1].split(`, `);
         let workers = [];


         for (let worker of workersArr) {
            let workerTokens = worker.split(` `);
            let salary = 0;
            workers.push({
               name: workerTokens[0],
               salary: Number(workerTokens[1])
            });
         }
         if (restaurants[name]) {
            workers = workers.concat(restaurants[name].workers);
         }
         workers.sort((a, b) => b.salary - a.salary);
         let bestSalary = workers[0].salary;
         let averageSalary = (workers.reduce((a, worker) => a + worker.salary, 0) / workers.length)

         restaurants[name] = {
            workers,
            averageSalary,
            bestSalary,
         }

      })
      let bestRestarurantSalary = 0;
      let best = undefined;
      for (let name in restaurants) {
         if (restaurants[name].averageSalary >= bestRestarurantSalary) {
            best = {
               name: restaurants[name].name,
               workers: restaurants[name].workers,
               bestSalary: restaurants[name].bestSalary,
               averageSalary: restaurants[name].averageSalary
            }
            bestRestarurantSalary = restaurants[name].averageSalary;
         }
      }
      bestRestarurantP.textContent = `Name: ${best.name} Average Salary: ${best.averageSalary.toFixed(2)} Best Salary: ${best.bestSalary.toFixed(2)}`
      let workersResult = [];
      best.workers.forEach(worker => workersResult.push(`${worker.name} With Salary: ${worker.salary}`));
      workerP.textContent = workersResult.join(` `);
   }
}