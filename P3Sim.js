let choice, head, direction, queue;

function runSimulation() {

    choice = parseInt(document.getElementById("choice").value);

    function isNumberKey(evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
      
        if (charCode === 44 || (charCode >= 48 && charCode <= 57)) {
          return true;
        }
        else {
          return false;
        }
      }
      
    // Given below is the case for the C-LOOK algorithm
    if (choice === 1) {

        // Scanning the values of elements entered by the user
        queue = document.getElementById("queue").value;
        queue = queue.split(",");

        
        for (var i = 0; i < queue.length; i++) {
            queue[i] = parseInt(queue[i]);
        }
        
        // if (!isNumberKey(queue)) {
        //     alert("!! Please enter a valid queue !!")
        //     return false;
        // }

        document.getElementById("output1").innerHTML = "The array entered by the user is: " + queue;

        // These lines are used to scan the "Head" and "Direction" entered by the user.
        head = parseInt(document.getElementById("head").value);
        direction = parseInt(document.getElementById("direction").value);

        if (head < 0) {
            alert("!! Please enter a valid head value !!")
            return false;
        }

        if (direction === 1) {
            // For the left direction, the elements smaller than the head value are arranged in the descending order followed by the remaining elements in the ascending order.
            queue = queue.filter(q => q < head).sort((a, b) => b - a).concat(queue.filter(q => q >= head).sort((a, b) => a - b));
        }
        else if (direction === -1) {
            // For the right direction, the elements greater than the head value are arranged in the ascending order followed by the remaining elements in the descending order.
            queue = queue.filter(q => q >= head).sort((a, b) => a - b).concat(queue.filter(q => q < head).sort((a, b) => b - a));
        }
        else {
            alert("!! Please make a valid choice !!")
        }

        console.log(queue);

        // Here, we are defining the greatest and the smallest elements in the reordered queue.
        let maxNumber = Math.max(...queue);
        console.log(maxNumber);
        let minNumber = Math.min(...queue);
        console.log(minNumber);

        // This piece of code is used to find the total number of seek operations using the formula: Number = (highest value - head) + (highest value - lowest value)
        let a1 = parseInt(maxNumber) - parseInt(head);
        let a2 = parseInt(maxNumber) - parseInt(minNumber);
        let final = parseInt(a1) + parseInt(a2);
        console.log(final);

        document.getElementById("output2").innerHTML = "The seek sequence is: " + queue + "<br> The total number of seek operations is: " + final;

    }

    // Given below is the case for the LOOK algorithm
    else if (choice === -1) {

        queue = document.getElementById("queue").value;
        queue = queue.split(",");

        
        for (var i = 0; i < queue.length; i++) {
            queue[i] = parseInt(queue[i]);
        }
        
        // if (isNumberKey(queue)) {
        //     alert("!! Please enter a valid queue !!")
        //     return false;
        // }

        document.getElementById("output1").innerHTML = "The array entered by the user is: " + queue;

        // These lines are used to scan the "Head" and "Direction" entered by the user.
        head = parseInt(document.getElementById("head").value);
        direction = parseInt(document.getElementById("direction").value);

        if (head < 0) {
            alert("!! Please enter a valid head value !!")
            return false;
        }

        if (direction === 1) {
            // For the left direction, the elements smaller than the head value are arranged in the descending order followed by the remaining elements in the descending order.
            queue = queue.filter(q => q < head).sort((a, b) => b - a).concat(queue.filter(q => q >= head).sort((a, b) => b - a));
        } else {
            // For the right direction, the elements greater than the head value are arranged in the ascending order followed by the remaining elements in the ascending order.
            queue = queue.filter(q => q >= head).sort((a, b) => a - b).concat(queue.filter(q => q < head).sort((a, b) => a - b));
        }

        console.log(queue);

        // Here, we are defining the greatest and the smallest elements in the reordered queue.
        let maxNumber = Math.max(...queue);
        console.log(maxNumber);
        let minNumber = Math.min(...queue);
        console.log(minNumber);

        // The code given below is used to find the element in an array closest to a given element.
        const closest = queue.reduce(function (prev, curr) {
            return Math.abs(curr - head) < Math.abs(prev - head) ? curr : prev;
        });
        console.log(closest);

        // This piece of code is used to find the total number of seek operations using the formula: Number = (highest value - head) + (highest value - lowest value)
        let a1 = parseInt(maxNumber) - parseInt(head);
        let a2 = parseInt(maxNumber) - parseInt(minNumber);
        let a3 = parseInt(closest) - parseInt(minNumber);
        let final = parseInt(a1) + parseInt(a2) + parseInt(a3);
        console.log(final);

        document.getElementById("output2").innerHTML = "The seek sequence is: " + queue + "<br> The total number of seek operations is: " + final;

    }

    else {

        // document.getElementById("output1").innerHTML = "!! Please make a valid choice for the algorithm !!";
        // setTimeout(() => output1.remove(), 3000);

        alert("!! Please make a valid choice !!")
        return false;

    }

}

function printGraph() {

    // Create an array of labels for each element in the queue defined in the earlier function
    let labels = queue.map((_, i) => i + 1);

    // Using the recorded queue as the data of the chart
    let data = queue;

    let config = {

        type: "line",
        data: {
            labels: labels,

            datasets: [
                {
                    label: "Seek sequence",
                    data: data,
                    fill: false,
                    borderColor: "#FFBFA0",
                    tension: 0.1
                }
            ]
        },

        options: {
            plugins: {
                title: {
                    display: true,
                    text: "Look"
                }
            },

            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Position"
                    }
                },

                y: {
                    title: {
                        display: true,
                        text: "value"
                    },
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    };

    let ctx = document.getElementById("myChart").getContext("2d");
    let myChart = new Chart(ctx, config);
}