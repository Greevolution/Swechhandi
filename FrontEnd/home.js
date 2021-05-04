// var textWrapper = document.querySelector('.p1');
// textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

// anime.timeline({loop: true})
//   .add({
//     targets: '.p1 .letter',
//     translateY: [-100,0],
//     easing: "easeOutExpo",
//     duration: 1400,
//     delay: (el, i) => 30 * i
//   }).add({
//     targets: '.p1',
//     opacity: 0,
//     duration: 1000,
//     easing: "easeOutExpo",
//     delay: 1000
//   });

var textWrapper = document.querySelector('.ml9 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({ loop: true })
    .add({
        targets: '.ml9 .letter',
        scale: [0, 1],
        duration: 1500,
        elasticity: 600,
        delay: (el, i) => 45 * (i + 1)
    }).add({
        targets: '.ml9',
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000
    });


var textWrapper = document.querySelector('.p3');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({ loop: true })
    .add({
        targets: '.p3 .letter',
        scale: [4, 1],
        opacity: [0, 1],
        translateZ: 0,
        easing: "easeOutExpo",
        duration: 950,
        delay: (el, i) => 70 * i
    }).add({
        targets: '.p3',
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000
    });

var textWrapper = document.querySelector('.mydiv');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({ loop: true })
    .add({
        targets: '.mydiv .letter',
        opacity: [0, 1],
        easing: "easeInOutQuad",
        duration: 20,
        delay: (el, i) => 150 * (i + 1)
    }).add({
        targets: '.mydiv',
        opacity: 0,
        duration: 20,
        easing: "easeOutExpo",
        delay: 5000
    });



const counters = document.querySelectorAll('.counter');
const speed = 5000; // The lower the slower

counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;

        // Lower inc to slow and higher to slow
        const inc = target / speed;

        // console.log(inc);
        // console.log(count);

        // Check if target is reached
        if (count < target) {
            // Add inc to count and output in counter
            counter.innerText = Math.ceil(count + inc);
            // Call function every ms
            setTimeout(updateCount, 5);
        } else {
            counter.innerText = target;
        }
    };

    updateCount();
});

window.addEventListener("DOMContentLoaded", function() {

    // get the form elements defined in your form HTML above

    var form = document.getElementById("test-form");
    //var button = document.getElementById("test-form-submit");
    var status = document.getElementById("status");

    // Success and Error functions for after the form is submitted

    function success() {
        form.reset();
        status.classList.add('success');
        status.innerHTML = "Thanks!";
    }

    function error() {
        status.classList.add('error');
        status.innerHTML = "Oops! There was a problem.";
    }

    // handle the form submission event

    form.addEventListener("submit", function(ev) {
        ev.preventDefault();
        var data = new FormData(form);
        ajax(form.method, form.action, data, success, error);
    });
});

// helper function for sending an AJAX request

function ajax(method, url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
        if (xhr.status === 200) {
            success(xhr.response, xhr.responseType);
        } else {
            error(xhr.status, xhr.response, xhr.responseType);
        }
    };
    xhr.send(data);
}