"use strict";

/* =====================================================
   EVENT DATA
===================================================== */

const events = [
    {
        id: "hackiem",
        name: "HackIEM 2026",
        date: "2026-12-12T09:00:00+05:30",
        venue: "AIML Lab, Gurukul Campus",
        category: "technical",
        description:
            "A collaborative hackathon where students build innovative technology solutions."
    },

    {
        id: "workshop",
        name: "Hands-on Deep Learning with PyTorch",
        date: "2026-10-03T10:00:00+05:30",
        venue: "AIML Lab",
        category: "workshop",
        description:
            "A practical workshop covering tensors, autograd, CNNs and small-scale deep learning projects."
    },

    {
        id: "guest",
        name: "Guest Lecture: Large Language Models",
        date: "2026-10-10T14:30:00+05:30",
        venue: "Seminar Hall",
        category: "lecture",
        description:
            "An expert session exploring modern language models, generative AI and real-world applications."
    },

    {
        id: "cultural",
        name: "Sharod Sandhya — Cultural Evening",
        date: "2026-10-16T17:00:00+05:30",
        venue: "Main Auditorium",
        category: "cultural",
        description:
            "An evening celebrating music, dance and creative performances by students."
    },

    {
        id: "robotics",
        name: "Line-Follower Robotics Challenge",
        date: "2026-11-07T10:00:00+05:30",
        venue: "IoT Lab",
        category: "technical",
        description:
            "Build and test an autonomous line-following robot through an exciting technical challenge."
    },

    {
        id: "techfest",
        name: "Innovation 2026 — Annual Tech Fest",
        date: "2026-11-20T09:00:00+05:30",
        venue: "Gurukul Campus",
        category: "technical",
        description:
            "A technology celebration featuring coding events, project showcases and innovation challenges."
    }
];


/* =====================================================
   SORT EVENTS BY DATE
===================================================== */

const sortedEvents = [...events].sort(
    (a, b) =>
        new Date(a.date).getTime() -
        new Date(b.date).getTime()
);


/* =====================================================
   HELPER FUNCTIONS
===================================================== */

const $ = (id) =>
    document.getElementById(id);


function setText(id, value) {

    const element = $(id);

    if (element) {
        element.textContent = value;
    }
}


/* =====================================================
   INDIA / KOLKATA TIMEZONE
===================================================== */

const IST = {
    timeZone: "Asia/Kolkata"
};


/* =====================================================
   DATE FORMATTER
===================================================== */

function formatDate(dateString) {

    const date = new Date(dateString);

    return {

        day: date.toLocaleDateString(
            "en-IN",
            {
                ...IST,
                day: "2-digit"
            }
        ),

        month: date.toLocaleDateString(
            "en-IN",
            {
                ...IST,
                month: "short"
            }
        ),

        full: date.toLocaleDateString(
            "en-IN",
            {
                ...IST,
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        ),

        time: date.toLocaleTimeString(
            "en-IN",
            {
                ...IST,
                hour: "2-digit",
                minute: "2-digit"
            }
        )
    };
}


/* =====================================================
   DOM ELEMENTS
===================================================== */

const eventList =
    $("eventList");

const eventSelect =
    $("eventSelect");

const emptyMessage =
    $("emptyMessage");


/* =====================================================
   RENDER EVENTS
===================================================== */

function renderEvents() {

    /* -----------------------------------------------
       EVENT CARDS
    ------------------------------------------------ */

    if (eventList) {

        eventList.innerHTML =
            sortedEvents
                .map(event => {

                    const date =
                        formatDate(event.date);

                    const category =
                        event.category
                            .charAt(0)
                            .toUpperCase() +
                        event.category.slice(1);

                    return `

                        <article
                            class="event-card"
                            data-category="${event.category}"
                        >

                            <div class="event-date">

                                <span class="event-day">
                                    ${date.day}
                                </span>

                                <span class="event-month">
                                    ${date.month}
                                </span>

                            </div>


                            <div class="event-content">

                                <h3>
                                    ${event.name}
                                </h3>

                                <p class="event-meta">
                                    ${date.full}
                                    ·
                                    ${date.time}
                                    ·
                                    ${event.venue}
                                </p>

                                <p class="event-description">
                                    ${event.description}
                                </p>

                            </div>


                            <div class="event-side">

                                <span class="event-category">
                                    ${category}
                                </span>

                                <button
                                    type="button"
                                    class="event-register"
                                    data-id="${event.id}"
                                >
                                    Register →
                                </button>

                            </div>

                        </article>

                    `;
                })
                .join("");
    }


    /* -----------------------------------------------
       EVENT DROPDOWN
    ------------------------------------------------ */

    if (eventSelect) {

        eventSelect.innerHTML =
            `
                <option value="">
                    Select an event
                </option>
            `;


        sortedEvents.forEach(event => {

            const date =
                formatDate(event.date);


            const option =
                document.createElement(
                    "option"
                );


            option.value =
                event.id;


            option.textContent =
                `${event.name} — ${date.day} ${date.month}`;


            eventSelect.appendChild(
                option
            );

        });
    }


    /* -----------------------------------------------
       TOTAL EVENT COUNT
    ------------------------------------------------ */

    setText(
        "statEvents",
        events.length
    );
}


/* =====================================================
   REGISTER BUTTON
===================================================== */

if (eventList) {

    eventList.addEventListener(
        "click",
        function (e) {

            const button =
                e.target.closest(
                    ".event-register"
                );


            if (!button) {
                return;
            }


            /* Select event */

            if (eventSelect) {

                eventSelect.value =
                    button.dataset.id;
            }


            /* Scroll to registration */

            const registration =
                $("register");


            if (registration) {

                registration.scrollIntoView({
                    behavior: "smooth"
                });
            }


            /* Focus student name */

            setTimeout(
                () => {

                    const name =
                        $("studentName");


                    if (name) {

                        name.focus({
                            preventScroll: true
                        });

                    }

                },
                700
            );

        }
    );
}


/* =====================================================
   EVENT FILTER
===================================================== */

const filterButtons =
    document.querySelectorAll(
        ".filter-button"
    );


filterButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            function () {

                /* Remove active */

                filterButtons.forEach(
                    btn => {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                /* Add active */

                this.classList.add(
                    "active"
                );


                const selected =
                    this.dataset.filter;


                let visible =
                    0;


                /* Filter cards */

                document
                    .querySelectorAll(
                        ".event-card"
                    )
                    .forEach(card => {

                        const show =
                            selected === "all" ||
                            card.dataset.category ===
                            selected;


                        card.classList.toggle(
                            "event-hidden",
                            !show
                        );


                        if (show) {
                            visible++;
                        }

                    });


                /* Empty message */

                if (emptyMessage) {

                    emptyMessage.style.display =
                        visible === 0
                            ? "block"
                            : "none";
                }

            }
        );

    }
);


/* =====================================================
   HACKIEM COUNTDOWN
=====================================================

   EVENT:
   HackIEM 2026

   DATE:
   12 December 2026

   TIME:
   09:00 AM

   TIMEZONE:
   IST / Asia-Kolkata

===================================================== */


/*
   ISO 8601 format.

   +05:30 means India Standard Time.
*/

const HACKIEM_DATE =
    "2026-12-12T09:00:00+05:30";


/*
   Convert event date into
   milliseconds timestamp.
*/

const HACKIEM_TIMESTAMP =
    new Date(
        HACKIEM_DATE
    ).getTime();


/*
   Safety check.
*/

if (
    Number.isNaN(
        HACKIEM_TIMESTAMP
    )
) {

    console.error(
        "HackIEM countdown date is invalid."
    );
}


/* =====================================================
   LIVE EVENT WINDOW
=====================================================

   After 09:00 AM on 12 Dec 2026,
   the event can show LIVE NOW.

   This keeps LIVE NOW for 3 hours.
*/

const LIVE_WINDOW_MS =
    3 * 60 * 60 * 1000;


/* =====================================================
   NEXT EVENT
===================================================== */

function getNextUpcomingEvent() {

    const now =
        Date.now();


    return sortedEvents.find(
        event => {

            const eventTime =
                new Date(
                    event.date
                ).getTime();


            return eventTime > now;

        }
    ) || null;
}


/* =====================================================
   UPDATE NEXT EVENT INFORMATION
===================================================== */

function updateNextEventInfo() {

    const now =
        Date.now();


    /*
       Before HackIEM:
       Show HackIEM.
    */

    if (
        now <
        HACKIEM_TIMESTAMP
    ) {

        setText(
            "nextEventTitle",
            "HackIEM 2026"
        );


        setText(
            "nextEventDetails",
            "Saturday, 12 December 2026 · 09:00 AM · AIML Lab, Gurukul Campus"
        );


        setText(
            "statusBadge",
            "UPCOMING"
        );


        return;
    }


    /*
       During HackIEM:
       Show LIVE NOW.
    */

    if (
        now >= HACKIEM_TIMESTAMP &&
        now <=
            HACKIEM_TIMESTAMP +
            LIVE_WINDOW_MS
    ) {

        setText(
            "nextEventTitle",
            "HackIEM 2026"
        );


        setText(
            "nextEventDetails",
            "Saturday, 12 December 2026 · 09:00 AM · AIML Lab, Gurukul Campus"
        );


        setText(
            "statusBadge",
            "LIVE NOW"
        );


        return;
    }


    /*
       After HackIEM:
       Find next event.
    */

    const nextEvent =
        getNextUpcomingEvent();


    if (nextEvent) {

        const date =
            formatDate(
                nextEvent.date
            );


        setText(
            "nextEventTitle",
            nextEvent.name
        );


        setText(
            "nextEventDetails",
            `${date.full} · ${date.time} · ${nextEvent.venue}`
        );


        setText(
            "statusBadge",
            "UPCOMING"
        );

    }

    else {

        setText(
            "nextEventTitle",
            "All events completed"
        );


        setText(
            "nextEventDetails",
            "Stay tuned for the next semester's events."
        );


        setText(
            "statusBadge",
            "COMPLETED"
        );
    }
}


/* =====================================================
   COUNTDOWN DISPLAY
===================================================== */

function updateCountdown() {

    const now =
        Date.now();


    /*
       Difference between
       HackIEM and current time.
    */

    let difference =
        HACKIEM_TIMESTAMP -
        now;


    /*
       Before event:
       Normal countdown.
    */

    if (
        difference > 0
    ) {

        const totalSeconds =
            Math.floor(
                difference / 1000
            );


        /* DAYS */

        const days =
            Math.floor(
                totalSeconds / 86400
            );


        /* HOURS */

        const hours =
            Math.floor(
                (totalSeconds % 86400) /
                3600
            );


        /* MINUTES */

        const minutes =
            Math.floor(
                (totalSeconds % 3600) /
                60
            );


        /* SECONDS */

        const seconds =
            totalSeconds % 60;


        /* DISPLAY */

        setText(
            "days",
            String(days).padStart(
                2,
                "0"
            )
        );


        setText(
            "hours",
            String(hours).padStart(
                2,
                "0"
            )
        );


        setText(
            "minutes",
            String(minutes).padStart(
                2,
                "0"
            )
        );


        setText(
            "seconds",
            String(seconds).padStart(
                2,
                "0"
            )
        );


        setText(
            "statusBadge",
            "UPCOMING"
        );


        return;
    }


    /*
       Event has started.

       Show 00:00:00:00
       instead of negative values.
    */

    setText(
        "days",
        "00"
    );


    setText(
        "hours",
        "00"
    );


    setText(
        "minutes",
        "00"
    );


    setText(
        "seconds",
        "00"
    );


    /*
       LIVE NOW
    */

    if (
        now <=
        HACKIEM_TIMESTAMP +
        LIVE_WINDOW_MS
    ) {

        setText(
            "statusBadge",
            "LIVE NOW"
        );

    }

    else {

        /*
           After HackIEM,
           the countdown is no longer
           applicable to HackIEM.
        */

        setText(
            "statusBadge",
            "COMPLETED"
        );

    }
}


/* =====================================================
   KOLKATA REAL-TIME CLOCK
===================================================== */

function updateKolkataClock() {

    const currentTime =
        new Date().toLocaleTimeString(
            "en-IN",
            {
                ...IST,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }
        );


    setText(
        "kolkataClock",
        currentTime
    );
}


/* =====================================================
   DARK MODE
===================================================== */

const themeButton =
    $("themeButton");


if (themeButton) {

    let savedTheme =
        null;


    try {

        savedTheme =
            localStorage.getItem(
                "iem-theme"
            );

    }
    catch (error) {

        console.warn(
            "Local storage is unavailable."
        );

    }


    if (
        savedTheme === "dark"
    ) {

        document.body.classList.add(
            "dark"
        );


        themeButton.textContent =
            "☀";

    }
    else {

        themeButton.textContent =
            "☾";
    }


    themeButton.addEventListener(
        "click",
        function () {

            document.body.classList.toggle(
                "dark"
            );


            const isDark =
                document.body.classList.contains(
                    "dark"
                );


            themeButton.textContent =
                isDark
                    ? "☀"
                    : "☾";


            try {

                localStorage.setItem(
                    "iem-theme",
                    isDark
                        ? "dark"
                        : "light"
                );

            }
            catch (error) {

                console.warn(
                    "Unable to save theme."
                );

            }

        }
    );
}


/* =====================================================
   MOBILE MENU
===================================================== */

const menuButton =
    $("menuButton");


const navigation =
    $("navigation");


if (
    menuButton &&
    navigation
) {

    menuButton.addEventListener(
        "click",
        () => {

            navigation.classList.toggle(
                "open"
            );

        }
    );
}


document
    .querySelectorAll(
        ".nav-link"
    )
    .forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    if (navigation) {

                        navigation.classList.remove(
                            "open"
                        );

                    }

                }
            );

        }
    );


/* =====================================================
   SCROLL EFFECTS
===================================================== */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );


const siteHeader =
    document.querySelector(
        ".site-header"
    );


const progress =
    $("scrollProgress");


const toTop =
    $("toTop");


function onScroll() {

    /* -----------------------------------------------
       Header
    ------------------------------------------------ */

    if (siteHeader) {

        siteHeader.classList.toggle(
            "scrolled",
            window.scrollY > 20
        );

    }


    /* -----------------------------------------------
       Scroll Progress
    ------------------------------------------------ */

    if (progress) {

        const max =
            document.documentElement
                .scrollHeight -
            window.innerHeight;


        const percentage =
            max > 0
                ? (
                    window.scrollY /
                    max
                ) * 100
                : 0;


        progress.style.width =
            percentage + "%";

    }


    /* -----------------------------------------------
       Back To Top
    ------------------------------------------------ */

    if (toTop) {

        toTop.classList.toggle(
            "show",
            window.scrollY > 600
        );

    }


    /* -----------------------------------------------
       Active Navigation
    ------------------------------------------------ */

    let currentSection =
        "home";


    sections.forEach(
        section => {

            if (
                window.scrollY >=
                section.offsetTop - 130
            ) {

                currentSection =
                    section.id;

            }

        }
    );


    /*
       Coordinators section does not have
       a navigation link.

       Therefore use About.
    */

    const navTarget =
        currentSection ===
        "coordinators"
            ? "about"
            : currentSection;


    document
        .querySelectorAll(
            ".nav-link"
        )
        .forEach(
            link => {

                link.classList.toggle(
                    "active",
                    link.getAttribute(
                        "href"
                    ) ===
                    "#" + navTarget
                );

            }
        );
}


/* =====================================================
   SCROLL EVENT
===================================================== */

window.addEventListener(
    "scroll",
    onScroll,
    {
        passive: true
    }
);


/* =====================================================
   BACK TO TOP
===================================================== */

if (toTop) {

    toTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );
}


/* =====================================================
   REGISTRATION FORM
===================================================== */

const registrationForm =
    $("registrationForm");


const registrationMessage =
    $("registrationMessage");


if (
    registrationForm &&
    registrationMessage
) {

    registrationForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const rollInput =
                $("rollNumber");


            const phoneInput =
                $("phone");


            const roll =
                rollInput
                    ? rollInput.value.trim()
                    : "";


            const phone =
                phoneInput
                    ? phoneInput.value.trim()
                    : "";


            /*
               Validate Roll Number
            */

            if (
                !/^\d{10}$/.test(
                    roll
                )
            ) {

                registrationMessage.textContent =
                    "Please enter a valid 10-digit roll number.";


                registrationMessage.className =
                    "form-message error";


                return;
            }


            /*
               Validate Phone
            */

            if (
                !/^\d{10}$/.test(
                    phone
                )
            ) {

                registrationMessage.textContent =
                    "Please enter a valid 10-digit phone number.";


                registrationMessage.className =
                    "form-message error";


                return;
            }


            /*
               Success
            */

            registrationMessage.textContent =
                "Registration submitted successfully!";


            registrationMessage.className =
                "form-message success";


            registrationForm.reset();

        }
    );
}


/* =====================================================
   FEEDBACK FORM
===================================================== */

const feedbackForm =
    $("feedbackForm");


const feedbackMessage =
    $("feedbackMessage");


if (
    feedbackForm &&
    feedbackMessage
) {

    feedbackForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            feedbackMessage.textContent =
                "Thank you! Your feedback has been received.";


            feedbackMessage.className =
                "form-message success";


            feedbackForm.reset();

        }
    );
}


/* =====================================================
   INITIALIZE WEBSITE
===================================================== */

renderEvents();

updateNextEventInfo();

updateCountdown();

updateKolkataClock();

onScroll();


/* =====================================================
   COUNTDOWN TIMER
=====================================================

   Updates every 1 second.
===================================================== */

setInterval(
    () => {

        updateCountdown();

        updateNextEventInfo();

    },
    1000
);


/* =====================================================
   KOLKATA CLOCK TIMER
===================================================== */

setInterval(
    updateKolkataClock,
    1000
);


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealTargets =
    document.querySelectorAll(
        ".section-heading, " +
        ".event-card, " +
        ".form-card, " +
        ".register-info, " +
        ".gallery-card, " +
        ".about-text, " +
        ".highlights-card, " +
        ".coordinator-card, " +
        ".contact-details"
    );


if (
    "IntersectionObserver"
    in window
) {

    const observer =
        new IntersectionObserver(
            (
                entries
            ) => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    revealTargets.forEach(
        (
            element,
            index
        ) => {

            element.classList.add(
                "reveal"
            );


            element.style.transitionDelay =
                `${(index % 4) * 90}ms`;


            observer.observe(
                element
            );

        }
    );

}