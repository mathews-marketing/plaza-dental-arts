/* Plaza Dental Arts — Zoey Website Chatbot
 * Direct script install. No iframe.
 */
(function () {
    'use strict';

    const PDA_ROOT_ID = 'pda-chatbot-widget';
    const PDA_STYLE_ID = 'pda-chatbot-protected-styles';
    const PDA_FONT_ID = 'pda-chatbot-font';
    const PDA_TAILWIND_ID = 'pda-chatbot-tailwind';
    const PDA_LUCIDE_ID = 'pda-chatbot-lucide';

    if (document.getElementById(PDA_ROOT_ID)) return;

    function addFont() {
        if (document.getElementById(PDA_FONT_ID)) return;

        const link = document.createElement('link');

        link.id = PDA_FONT_ID;
        link.rel = 'stylesheet';
        link.href =
            'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap';

        document.head.appendChild(link);
    }


    function loadScript(
        id,
        src,
        globalCheck
    ) {

        return new Promise(
            (resolve, reject) => {

                if (
                    globalCheck &&
                    globalCheck()
                ) {
                    resolve();
                    return;
                }


                const existing =
                    document.getElementById(
                        id
                    );


                if (existing) {

                    existing.addEventListener(
                        'load',
                        resolve,
                        {
                            once: true
                        }
                    );


                    existing.addEventListener(
                        'error',
                        reject,
                        {
                            once: true
                        }
                    );


                    return;
                }


                const script =
                    document.createElement(
                        'script'
                    );


                script.id = id;
                script.src = src;
                script.async = true;


                script.addEventListener(
                    'load',
                    resolve,
                    {
                        once: true
                    }
                );


                script.addEventListener(
                    'error',
                    reject,
                    {
                        once: true
                    }
                );


                document.head.appendChild(
                    script
                );
            }
        );
    }


    function installStyles() {

        if (
            document.getElementById(
                PDA_STYLE_ID
            )
        ) {
            return;
        }


        const el =
            document.createElement(
                'style'
            );


        el.id =
            PDA_STYLE_ID;


        el.textContent =
            String.raw`

/* =========================================================
   ANIMATIONS
   ========================================================= */

@keyframes smoothSpringUp {

    0% {
        opacity: 0;
        transform:
            translateY(20px)
            scale(0.98);
    }

    100% {
        opacity: 1;
        transform:
            translateY(0)
            scale(1);
    }
}


@keyframes smoothSpringDown {

    0% {
        opacity: 1;
        transform:
            translateY(0)
            scale(1);
    }

    100% {
        opacity: 0;

        transform:
            translateY(15px)
            scale(0.98);

        visibility:
            hidden;
    }
}


@keyframes slideInUp {

    0% {
        opacity: 0;

        transform:
            translateY(10px);
    }

    100% {
        opacity: 1;

        transform:
            translateY(0);
    }
}


@keyframes pulse-dot {

    0% {

        box-shadow:
            0 0 0 0
            rgba(
                15,
                87,
                188,
                0.6
            );
    }

    70% {

        box-shadow:
            0 0 0 6px
            rgba(
                15,
                87,
                188,
                0
            );
    }

    100% {

        box-shadow:
            0 0 0 0
            rgba(
                15,
                87,
                188,
                0
            );
    }
}


@keyframes bounceAttention {

    0%,
    100% {

        transform:
            translateY(0);
    }

    50% {

        transform:
            translateY(-12px);
    }
}


@keyframes gentleBounce {

    0%,
    100% {

        transform:
            translateY(0);
    }

    50% {

        transform:
            translateY(-4px);
    }
}


@keyframes typingBounce {

    0%,
    80%,
    100% {

        transform:
            scale(0);
    }

    40% {

        transform:
            scale(1);
    }
}


/* =========================================================
   TYPING
   ========================================================= */

#pda-chatbot-widget
.typing-dots {

    display:
        flex !important;

    gap:
        4px !important;

    padding:
        6px 4px !important;
}


#pda-chatbot-widget
.typing-dots span {

    width:
        6px !important;

    height:
        6px !important;

    background-color:
        #94a3b8 !important;

    border-radius:
        50% !important;

    animation:
        typingBounce
        1.4s
        infinite
        ease-in-out
        both !important;
}


#pda-chatbot-widget
.typing-dots span:nth-child(1) {

    animation-delay:
        -0.32s !important;
}


#pda-chatbot-widget
.typing-dots span:nth-child(2) {

    animation-delay:
        -0.16s !important;
}


/* =========================================================
   WIDGET ANIMATIONS
   ========================================================= */

#pda-chatbot-widget
.widget-hidden {

    pointer-events:
        none !important;

    animation:
        smoothSpringDown
        0.25s
        cubic-bezier(
            0.4,
            0,
            1,
            1
        )
        forwards !important;
}


#pda-chatbot-widget
.widget-visible {

    pointer-events:
        auto !important;

    animation:
        smoothSpringUp
        0.5s
        cubic-bezier(
            0.16,
            1,
            0.3,
            1
        )
        forwards !important;
}


#pda-chatbot-widget
.animate-message {

    animation:
        slideInUp
        0.35s
        cubic-bezier(
            0.16,
            1,
            0.3,
            1
        )
        forwards !important;
}


#pda-chatbot-widget
.status-dot {

    animation:
        pulse-dot
        2s
        infinite !important;
}


#pda-chatbot-widget
.animate-attention {

    animation:
        bounceAttention
        0.4s
        ease-in-out
        2 !important;
}


#pda-chatbot-widget
.animate-gentle-bounce {

    animation:
        gentleBounce
        1.5s
        ease-in-out
        infinite !important;
}


/* =========================================================
   SCROLLBARS
   ========================================================= */

#pda-chatbot-widget
.custom-scrollbar::-webkit-scrollbar {

    width:
        5px !important;

    height:
        5px !important;
}


#pda-chatbot-widget
.custom-scrollbar::-webkit-scrollbar-track {

    background:
        transparent !important;
}


#pda-chatbot-widget
.custom-scrollbar::-webkit-scrollbar-thumb {

    background:
        #e2e8f0 !important;

    border-radius:
        10px !important;
}


#pda-chatbot-widget
.custom-scrollbar::-webkit-scrollbar-thumb:hover {

    background:
        #cbd5e1 !important;
}


#pda-chatbot-widget
.hide-scrollbar::-webkit-scrollbar {

    display:
        none !important;
}


#pda-chatbot-widget
.hide-scrollbar {

    -ms-overflow-style:
        none !important;

    scrollbar-width:
        none !important;
}


/* =========================================================
   ROOT PROTECTION
   ========================================================= */

#pda-chatbot-widget {

    position:
        fixed !important;

    right:
        16px !important;

    bottom:
        16px !important;

    z-index:
        2147483647 !important;

    display:
        flex !important;

    flex-direction:
        column !important;

    align-items:
        flex-end !important;

    font-family:
        "Plus Jakarta Sans",
        Arial,
        sans-serif !important;

    font-size:
        16px !important;

    line-height:
        normal !important;

    color:
        #304454 !important;

    text-align:
        left !important;
}


@media (
    min-width:
    640px
) {

    #pda-chatbot-widget {

        right:
            24px !important;

        bottom:
            24px !important;
    }
}


#pda-chatbot-widget,
#pda-chatbot-widget *,
#pda-chatbot-widget *::before,
#pda-chatbot-widget *::after {

    box-sizing:
        border-box !important;
}


#pda-chatbot-widget button,
#pda-chatbot-widget input,
#pda-chatbot-widget textarea,
#pda-chatbot-widget select,
#pda-chatbot-widget a {

    font-family:
        "Plus Jakarta Sans",
        Arial,
        sans-serif !important;

    text-transform:
        none !important;

    letter-spacing:
        normal !important;
}


#pda-chatbot-widget button {

    -webkit-appearance:
        none !important;

    appearance:
        none !important;

    min-width:
        0 !important;

    min-height:
        0 !important;

    max-width:
        100% !important;

    outline:
        none !important;

    cursor:
        pointer !important;
}


#pda-chatbot-widget input,
#pda-chatbot-widget textarea {

    -webkit-appearance:
        none !important;

    appearance:
        none !important;
}


/* =========================================================
   PANEL
   ========================================================= */

#pda-chatbot-widget
#widget-panel {

    background-color:
        #ffffff !important;

    color:
        #304454 !important;

    overflow:
        hidden !important;
}


@media (
    max-width:
    639px
) {

    #pda-chatbot-widget
    #widget-panel {

        position:
            fixed !important;

        inset:
            0 !important;

        width:
            100% !important;

        height:
            100dvh !important;

        border:
            0 !important;

        border-radius:
            0 !important;

        box-shadow:
            none !important;
    }
}


@media (
    min-width:
    640px
) {

    #pda-chatbot-widget
    #widget-panel {

        position:
            relative !important;

        inset:
            auto !important;

        width:
            360px !important;

        height:
            620px !important;

        border:
            1px solid
            #e2e8f0 !important;

        border-radius:
            24px !important;

        box-shadow:
            0 30px 60px -15px
            rgba(
                0,
                0,
                0,
                .4
            ),

            0 10px 30px -5px
            rgba(
                0,
                0,
                0,
                .2
            )
            !important;
    }
}


/* =========================================================
   LARGE HEADER ZOEY AVATAR
   1.5PX WHITE RING
   ========================================================= */

#pda-chatbot-widget
.pda-header-avatar {

    width:
        56px !important;

    height:
        56px !important;

    min-width:
        56px !important;

    min-height:
        56px !important;

    padding:
        1.5px !important;

    background:
        #ffffff !important;

    background-color:
        #ffffff !important;

    border:
        0 !important;

    border-radius:
        50% !important;

    overflow:
        hidden !important;

    box-sizing:
        border-box !important;
}


#pda-chatbot-widget
.pda-header-avatar img {

    display:
        block !important;

    width:
        100% !important;

    height:
        100% !important;

    object-fit:
        cover !important;

    border-radius:
        50% !important;
}


/* =========================================================
   SMALL CHAT AVATAR
   ========================================================= */

#pda-chatbot-widget
.pda-message-avatar {

    width:
        28px !important;

    height:
        28px !important;

    min-width:
        28px !important;

    min-height:
        28px !important;

    border-radius:
        50% !important;

    overflow:
        hidden !important;
}


/* =========================================================
   INPUTS
   ========================================================= */

#pda-chatbot-widget
.chat-input-field {

    display:
        block !important;

    width:
        100% !important;

    max-width:
        100% !important;

    min-width:
        0 !important;

    height:
        auto !important;

    margin:
        0 0 12px 0 !important;

    padding:
        12px 16px !important;

    border:
        1px solid
        #e2e8f0 !important;

    border-radius:
        10px !important;

    background:
        #f8fafc !important;

    color:
        #304454 !important;

    font-size:
        14px !important;

    line-height:
        20px !important;

    box-shadow:
        none !important;

    outline:
        none !important;
}


#pda-chatbot-widget
textarea.chat-input-field {

    min-height:
        80px !important;

    resize:
        none !important;
}


#pda-chatbot-widget
.chat-input-field::placeholder {

    color:
        #94a3b8 !important;

    opacity:
        1 !important;
}


#pda-chatbot-widget
.chat-input-field:focus {

    background:
        #ffffff !important;

    border-color:
        #0f57bc !important;

    box-shadow:
        0 0 0 3px
        rgba(
            15,
            87,
            188,
            .15
        )
        !important;
}


/* =========================================================
   BACK BUTTON
   ========================================================= */

#pda-chatbot-widget
#nav-back-btn {

    background:
        transparent !important;

    border:
        0 !important;

    color:
        #64748b !important;

    padding:
        0 !important;

    width:
        auto !important;

    height:
        auto !important;
}


#pda-chatbot-widget
#nav-back-btn:hover {

    background:
        transparent !important;

    color:
        #0f57bc !important;
}


/* =========================================================
   GRID BUTTONS
   ========================================================= */

#pda-chatbot-widget
#bento-view
.grid button {

    height:
        auto !important;

    min-height:
        0 !important;

    margin:
        0 !important;

    padding:
        14px 12px !important;

    border:
        1px solid
        #e2e8f0 !important;

    border-radius:
        12px !important;

    background:
        #ffffff !important;

    color:
        #334155 !important;
}


#pda-chatbot-widget
#bento-view
.grid button:hover {

    background:
        #f8fafc !important;
}


#pda-chatbot-widget
#bento-view
.grid button:hover span,

#pda-chatbot-widget
#bento-view
.grid button:hover i {

    color:
        #0f57bc !important;
}


/* =========================================================
   BUTTON PROTECTION
   ========================================================= */

#pda-chatbot-widget
button.primary-cta-btn {

    width:
        100% !important;

    height:
        auto !important;

    min-height:
        0 !important;

    margin:
        0 !important;

    padding:
        14px !important;

    border:
        0 !important;

    border-radius:
        14px !important;

    background:
        #0f57bc !important;

    color:
        #ffffff !important;
}


#pda-chatbot-widget
button.primary-cta-btn:hover {

    background:
        #0d4a9f !important;
}


#pda-chatbot-widget
button.bg-accent-500:hover {

    background-color:
        #0d4a9f !important;

    color:
        #ffffff !important;
}


#pda-chatbot-widget
#live-chat-submit {

    width:
        32px !important;

    min-width:
        32px !important;

    height:
        32px !important;

    min-height:
        32px !important;

    margin:
        0 !important;

    padding:
        8px !important;

    border:
        0 !important;

    border-radius:
        50% !important;

    background:
        #0f57bc !important;

    color:
        #ffffff !important;
}


#pda-chatbot-widget
#trigger-btn {

    width:
        54px !important;

    min-width:
        54px !important;

    height:
        54px !important;

    min-height:
        54px !important;

    margin:
        0 !important;

    padding:
        0 !important;

    border:
        0 !important;

    border-radius:
        50% !important;

    background:
        transparent !important;
}

        `;


        document.head.appendChild(
            el
        );
    }


    function installMarkup() {

        const holder =
            document.createElement(
                'div'
            );


        holder.innerHTML =
            String.raw`

<div
    id="pda-chatbot-widget"
    class="
        fixed
        bottom-4
        right-4
        sm:bottom-6
        sm:right-6
        z-[99999]
        flex
        flex-col
        items-end
        antialiased
        font-sans
    "
    style="
        font-family:
        'Plus Jakarta Sans',
        sans-serif;
    "
>


    <!-- ==================================================
         PANEL
         ================================================== -->

    <div
        id="widget-panel"
        class="
            fixed
            inset-0
            sm:relative
            sm:inset-auto
            w-full
            h-[100dvh]
            sm:w-[360px]
            sm:h-[620px]
            bg-white
            sm:rounded-[24px]
            shadow-none
            sm:shadow-elegant
            border-none
            sm:border
            border-slate-200
            origin-bottom-right
            flex-col
            overflow-hidden
            text-[#304454]
            z-[100]
        "
        style="
            display:
            none;
        "
    >


        <!-- ==================================================
             MAIN MENU
             ================================================== -->

        <div
            id="bento-view"
            class="
                absolute
                inset-0
                flex
                flex-col
                w-full
                h-full
                transition-all
                duration-300
                opacity-100
                translate-x-0
                bg-white
            "
        >


            <!-- HEADER -->

            <div
                class="
                    h-[72px]
                    px-5
                    flex
                    justify-between
                    items-center
                    bg-[#0f57bc]
                    relative
                    z-10
                    overflow-hidden
                    shrink-0
                "
            >

                <div
                    class="
                        flex
                        items-center
                        gap-4
                        relative
                        z-10
                    "
                >

                    <div
                        class="
                            relative
                            shrink-0
                        "
                    >


                        <!--
                            LARGE ZOEY HEADER IMAGE
                            1.5PX WHITE RING
                        -->

                        <div
                            class="
                                pda-header-avatar
                                w-14
                                h-14
                                rounded-full
                                shadow-md
                                bg-white
                            "
                            style="
                                width:
                                56px !important;

                                height:
                                56px !important;

                                min-width:
                                56px !important;

                                min-height:
                                56px !important;

                                padding:
                                1.5px !important;

                                background:
                                #ffffff !important;

                                border-radius:
                                50% !important;

                                overflow:
                                hidden !important;

                                box-sizing:
                                border-box !important;
                            "
                        >

                            <img
                                src="https://assets.cdn.filesafe.space/jwSB6dgnvqYwCtaIHqjF/media/6a70e1c1a1aa89ccfe046ba2.png"
                                alt="Zoey - AI Assistant"
                                class="
                                    w-full
                                    h-full
                                    object-cover
                                "
                                style="
                                    display:
                                    block !important;

                                    width:
                                    100% !important;

                                    height:
                                    100% !important;

                                    object-fit:
                                    cover !important;

                                    border-radius:
                                    50% !important;
                                "
                            >

                        </div>


                        <span
                            class="
                                absolute
                                bottom-0
                                right-0
                                w-3.5
                                h-3.5
                                bg-emerald-400
                                border-2
                                border-white
                                rounded-full
                                status-dot
                            "
                        ></span>

                    </div>


                    <div>

                        <h3
                            class="
                                text-white
                                text-[17px]
                                font-bold
                                tracking-tight
                                leading-none
                                mb-1.5
                                m-0
                            "
                        >
                            Plaza Dental Arts
                        </h3>


                        <p
                            class="
                                text-white/80
                                text-[12.5px]
                                font-medium
                                leading-none
                                m-0
                            "
                        >
                            Zoey • AI Assistant
                        </p>

                    </div>

                </div>


                <button
                    type="button"
                    onclick="
                        window.toggleWidget()
                    "
                    class="
                        text-white/70
                        hover:text-white
                        transition-colors
                        hover:bg-white/10
                        rounded-full
                        p-2
                        shrink-0
                        active:scale-95
                        bg-transparent
                        m-0
                    "
                    style="
                        border:
                        none !important;
                    "
                >

                    <i
                        data-lucide="x"
                        class="
                            w-5
                            h-5
                        "
                    ></i>

                </button>

            </div>


            <!-- CONTENT -->

            <div
                class="
                    p-5
                    flex
                    flex-col
                    gap-3
                    bg-[#FAFAFA]
                    flex-1
                    overflow-y-auto
                    custom-scrollbar
                "
            >

                <div
                    id="welcome-bubble"
                    class="
                        bg-white
                        border
                        border-slate-100
                        shadow-card
                        rounded-2xl
                        rounded-tr-sm
                        p-4
                        text-[13.5px]
                        text-slate-600
                        leading-relaxed
                        font-medium
                        m-0
                    "
                >
                    Welcome to Plaza Dental Arts!
                    I'm here to help you get scheduled,
                    answer questions, or connect you with
                    our team. How can I assist you today?
                </div>


                <!-- SCHEDULE -->

                <button
                    type="button"
                    onclick="
                        window.appBot
                        .startFlow(
                            'schedule'
                        )
                    "
                    class="
                        primary-cta-btn
                        w-full
                        bg-[#0f57bc]
                        text-white
                        py-[14px]
                        px-3.5
                        rounded-[14px]
                        flex
                        items-center
                        justify-between
                        transition-all
                        duration-200
                        group
                        active:scale-[0.98]
                        shadow-none
                        m-0
                        text-left
                        cursor-pointer
                    "
                    style="
                        border:
                        none !important;
                    "
                >

                    <div
                        class="
                            flex
                            items-center
                            gap-3
                            flex-1
                            min-w-0
                            mr-2
                        "
                    >

                        <div
                            class="
                                bg-white/15
                                text-white
                                w-[42px]
                                h-[42px]
                                rounded-[10px]
                                shrink-0
                                flex
                                items-center
                                justify-center
                            "
                        >

                            <i
                                data-lucide="calendar"
                                class="
                                    w-[18px]
                                    h-[18px]
                                "
                            ></i>

                        </div>


                        <div
                            class="
                                text-left
                                flex
                                flex-col
                                justify-center
                                flex-1
                                min-w-0
                            "
                        >

                            <span
                                class="
                                    block
                                    font-bold
                                    text-[14.5px]
                                    tracking-tight
                                    text-white
                                    leading-none
                                    truncate
                                "
                            >
                                Schedule Appointment
                            </span>


                            <span
                                class="
                                    block
                                    text-white/80
                                    text-[11px]
                                    font-medium
                                    tracking-wide
                                    leading-none
                                    mt-1
                                    truncate
                                "
                            >
                                New & existing patients
                                • Takes 60s
                            </span>

                        </div>

                    </div>


                    <div
                        class="
                            bg-white/20
                            w-6
                            h-6
                            rounded-full
                            shrink-0
                            flex
                            items-center
                            justify-center
                        "
                    >

                        <i
                            data-lucide="chevron-right"
                            class="
                                w-3.5
                                h-3.5
                                text-white
                            "
                        ></i>

                    </div>

                </button>


                <!-- EMERGENCY -->

                <button
                    type="button"
                    onclick="
                        window.appBot
                        .startFlow(
                            'emergency'
                        )
                    "
                    class="
                        w-full
                        bg-[#fff4f4]
                        text-[#d92d20]
                        py-[14px]
                        px-3.5
                        rounded-[14px]
                        flex
                        items-center
                        justify-between
                        transition-all
                        duration-200
                        group
                        active:scale-[0.98]
                        shadow-none
                        m-0
                        text-left
                        cursor-pointer
                        mt-1
                    "
                    style="
                        border:
                        1px solid
                        #ffdede !important;
                    "
                >

                    <div
                        class="
                            flex
                            items-center
                            gap-3
                            flex-1
                            min-w-0
                            mr-2
                        "
                    >

                        <div
                            class="
                                bg-white
                                text-[#d92d20]
                                w-[42px]
                                h-[42px]
                                rounded-[10px]
                                shrink-0
                                flex
                                items-center
                                justify-center
                                shadow-sm
                            "
                        >

                            <i
                                data-lucide="shield-alert"
                                class="
                                    w-[18px]
                                    h-[18px]
                                "
                            ></i>

                        </div>


                        <div
                            class="
                                text-left
                                flex
                                flex-col
                                justify-center
                                flex-1
                                min-w-0
                            "
                        >

                            <span
                                class="
                                    block
                                    font-bold
                                    text-[14.5px]
                                    text-[#d92d20]
                                    leading-none
                                    truncate
                                "
                            >
                                Dental Emergency
                            </span>


                            <span
                                class="
                                    block
                                    text-[#f04438]
                                    text-[11px]
                                    font-medium
                                    mt-1
                                    truncate
                                "
                            >
                                Call us immediately
                                • We're here to help
                            </span>

                        </div>

                    </div>


                    <div
                        class="
                            w-2
                            h-2
                            bg-[#f04438]
                            rounded-full
                        "
                    ></div>

                </button>


                <!-- FOUR GRID BUTTONS -->

                <div
                    class="
                        grid
                        grid-cols-2
                        gap-2
                        mt-1
                        m-0
                    "
                >

                    <button
                        type="button"
                        onclick="
                            window.appBot
                            .startFlow(
                                'reschedule'
                            )
                        "
                        class="
                            flex
                            items-center
                            gap-2
                            py-3.5
                            px-3
                            rounded-xl
                            border
                            border-slate-200
                            bg-white
                            shadow-sm
                            m-0
                            text-left
                        "
                    >

                        <i
                            data-lucide="calendar-clock"
                            class="
                                w-4
                                h-4
                                text-slate-400
                            "
                        ></i>

                        <span
                            class="
                                text-[11.5px]
                                font-semibold
                                text-slate-700
                            "
                        >
                            Reschedule
                        </span>

                    </button>


                    <button
                        type="button"
                        onclick="
                            window.appBot
                            .startFlow(
                                'question'
                            )
                        "
                        class="
                            flex
                            items-center
                            gap-2
                            py-3.5
                            px-3
                            rounded-xl
                            border
                            border-slate-200
                            bg-white
                            shadow-sm
                            m-0
                            text-left
                        "
                    >

                        <i
                            data-lucide="message-circle"
                            class="
                                w-4
                                h-4
                                text-slate-400
                            "
                        ></i>

                        <span
                            class="
                                text-[11.5px]
                                font-semibold
                                text-slate-700
                            "
                        >
                            Ask Question
                        </span>

                    </button>


                    <button
                        type="button"
                        onclick="
                            window.appBot
                            .startFlow(
                                'call'
                            )
                        "
                        class="
                            flex
                            items-center
                            gap-2
                            py-3.5
                            px-3
                            rounded-xl
                            border
                            border-slate-200
                            bg-white
                            shadow-sm
                            m-0
                            text-left
                        "
                    >

                        <i
                            data-lucide="phone"
                            class="
                                w-4
                                h-4
                                text-slate-400
                            "
                        ></i>

                        <span
                            class="
                                text-[11.5px]
                                font-semibold
                                text-slate-700
                            "
                        >
                            Call Us
                        </span>

                    </button>


                    <button
                        type="button"
                        onclick="
                            window.appBot
                            .startFlow(
                                'reviews'
                            )
                        "
                        class="
                            flex
                            items-center
                            gap-2
                            py-3.5
                            px-3
                            rounded-xl
                            border
                            border-slate-200
                            bg-white
                            shadow-sm
                            m-0
                            text-left
                        "
                    >

                        <i
                            data-lucide="star"
                            class="
                                w-4
                                h-4
                                text-slate-400
                            "
                        ></i>

                        <span
                            class="
                                text-[11.5px]
                                font-semibold
                                text-slate-700
                            "
                        >
                            Reviews
                        </span>

                    </button>

                </div>

            </div>


            <!-- FOOTER -->

            <div
                class="
                    bg-white
                    p-3.5
                    border-t
                    border-slate-100
                    flex
                    items-center
                    justify-center
                    gap-2
                    shrink-0
                    m-0
                "
            >

                <i
                    data-lucide="smile"
                    class="
                        w-4
                        h-4
                        text-accent-500
                    "
                ></i>

                <span
                    class="
                        text-[10px]
                        text-slate-500
                        font-bold
                        tracking-widest
                        uppercase
                    "
                >
                    Exceptional Dental Care
                </span>

            </div>

        </div>


        <!-- ==================================================
             CHAT VIEW
             ================================================== -->

        <div
            id="chat-view"
            class="
                absolute
                inset-0
                flex
                flex-col
                w-full
                h-full
                transition-all
                duration-300
                opacity-0
                translate-x-full
                pointer-events-none
                bg-white
                z-10
            "
        >


            <!-- CHAT HEADER -->

            <div
                class="
                    h-[72px]
                    px-5
                    flex
                    items-center
                    justify-between
                    bg-[#0f57bc]
                    relative
                    z-10
                    overflow-hidden
                    shrink-0
                    m-0
                "
            >

                <div
                    class="
                        flex
                        items-center
                        gap-4
                        relative
                        z-10
                    "
                >

                    <div
                        class="
                            relative
                            shrink-0
                        "
                    >


                        <div
                            class="
                                pda-header-avatar
                                w-14
                                h-14
                                rounded-full
                                shadow-md
                                bg-white
                            "
                            style="
                                width:
                                56px !important;

                                height:
                                56px !important;

                                min-width:
                                56px !important;

                                min-height:
                                56px !important;

                                padding:
                                1.5px !important;

                                background:
                                #ffffff !important;

                                border-radius:
                                50% !important;

                                overflow:
                                hidden !important;

                                box-sizing:
                                border-box !important;
                            "
                        >

                            <img
                                src="https://assets.cdn.filesafe.space/jwSB6dgnvqYwCtaIHqjF/media/6a70e1c1a1aa89ccfe046ba2.png"
                                alt="Zoey"
                                class="
                                    w-full
                                    h-full
                                    object-cover
                                "
                                style="
                                    display:
                                    block !important;

                                    width:
                                    100% !important;

                                    height:
                                    100% !important;

                                    object-fit:
                                    cover !important;

                                    border-radius:
                                    50% !important;
                                "
                            >

                        </div>


                        <span
                            class="
                                absolute
                                bottom-0
                                right-0
                                w-3.5
                                h-3.5
                                bg-emerald-400
                                border-2
                                border-white
                                rounded-full
                                status-dot
                            "
                        ></span>

                    </div>


                    <div>

                        <h4
                            id="chat-header-title"
                            class="
                                text-[17px]
                                font-bold
                                text-white
                                leading-none
                                mb-1.5
                                m-0
                            "
                        >
                            Plaza Dental Arts
                        </h4>


                        <span
                            class="
                                text-[12.5px]
                                text-white/80
                                font-medium
                                leading-none
                                block
                            "
                        >
                            Online • Ready to help
                        </span>

                    </div>

                </div>


                <button
                    type="button"
                    onclick="
                        window.toggleWidget()
                    "
                    class="
                        text-white/70
                        hover:text-white
                        transition-colors
                        p-1.5
                        rounded-lg
                        hover:bg-white/10
                        bg-transparent
                        m-0
                    "
                    style="
                        border:
                        none !important;
                    "
                >

                    <i
                        data-lucide="x"
                        class="
                            w-5
                            h-5
                        "
                    ></i>

                </button>

            </div>


            <!-- CHAT NAV -->

            <div
                id="chat-nav"
                class="
                    px-5
                    pt-4
                    pb-2
                    bg-[#FAFAFA]
                    flex
                    justify-between
                    items-center
                    shrink-0
                    border-b
                    border-slate-100/50
                    m-0
                "
            >

                <button
                    type="button"
                    id="nav-back-btn"
                    onclick="
                        window.appBot
                        .goBack()
                    "
                >

                    <i
                        data-lucide="arrow-left"
                        class="
                            w-4
                            h-4
                        "
                    ></i>

                    Back

                </button>


                <span
                    id="step-indicator"
                    class="
                        text-[10px]
                        font-bold
                        text-slate-500
                        uppercase
                        tracking-widest
                        bg-slate-200/50
                        px-2.5
                        py-1
                        rounded-full
                    "
                >
                    Step 1 of 2
                </span>

            </div>


            <!-- HISTORY -->

            <div
                id="chat-history"
                class="
                    flex-1
                    overflow-y-auto
                    overflow-x-hidden
                    p-5
                    pt-4
                    flex
                    flex-col
                    gap-4
                    bg-[#FAFAFA]
                    custom-scrollbar
                    pb-6
                    relative
                    m-0
                "
            ></div>


            <!-- SCROLL DOWN -->

            <button
                type="button"
                id="scroll-down-btn"
                onclick="
                    document
                    .getElementById(
                        'chat-history'
                    )
                    .scrollTo({
                        top:
                            document
                            .getElementById(
                                'chat-history'
                            )
                            .scrollHeight,

                        behavior:
                            'smooth'
                    })
                "
                class="
                    absolute
                    bottom-[90px]
                    left-2
                    bg-accent-500
                    text-white
                    rounded-full
                    w-8
                    h-8
                    shadow-md
                    z-20
                    animate-gentle-bounce
                    flex
                    items-center
                    justify-center
                "
                style="
                    display:
                    none !important;

                    border:
                    none !important;
                "
            >

                <i
                    data-lucide="arrow-down"
                    class="
                        w-4
                        h-4
                    "
                ></i>

            </button>


            <!-- LIVE CHAT INPUT -->

            <div
                id="chat-input-area"
                class="
                    p-3
                    bg-white
                    border-t
                    border-slate-100
                    shrink-0
                    flex-col
                    gap-2
                    m-0
                "
                style="
                    display:
                    none !important;
                "
            >

                <button
                    type="button"
                    onclick="
                        window.appBot
                        .startFlow(
                            'schedule'
                        )
                    "
                    class="
                        w-full
                        bg-[#0f57bc]
                        text-white
                        py-2.5
                        rounded-xl
                        text-[13px]
                        font-bold
                        flex
                        items-center
                        justify-center
                        gap-2
                    "
                >

                    <i
                        data-lucide="calendar-plus"
                        class="
                            w-4
                            h-4
                        "
                    ></i>

                    Schedule Appointment

                </button>


                <form
                    onsubmit="
                        event.preventDefault();

                        window.appBot
                        .handleChatSend();
                    "
                    class="
                        relative
                        flex
                        items-center
                        m-0
                        p-0
                        mt-1
                    "
                >

                    <input
                        type="text"
                        id="live-chat-input"
                        placeholder="Type your message..."
                        autocomplete="off"
                        class="
                            w-full
                            bg-slate-50
                            border
                            border-slate-200
                            text-[14px]
                            rounded-full
                            py-3
                            pl-4
                            pr-12
                            text-slate-700
                            placeholder-slate-400
                        "
                    >


                    <button
                        id="live-chat-submit"
                        type="submit"
                        class="
                            absolute
                            right-1.5
                            p-2
                            bg-accent-500
                            text-white
                            rounded-full
                            flex
                            items-center
                            justify-center
                            m-0
                        "
                        style="
                            border:
                            none !important;
                        "
                    >

                        <i
                            data-lucide="send"
                            class="
                                w-4
                                h-4
                            "
                        ></i>

                    </button>

                </form>

            </div>


            <!-- HIPAA -->

            <div
                id="hipaa-footer"
                class="
                    p-3
                    bg-white
                    border-t
                    border-slate-100
                    text-center
                    shrink-0
                    m-0
                "
            >

                <p
                    class="
                        text-[10px]
                        text-slate-400
                        font-bold
                        tracking-widest
                        uppercase
                        flex
                        items-center
                        justify-center
                        gap-1.5
                        m-0
                    "
                >

                    <i
                        data-lucide="lock"
                        class="
                            w-3
                            h-3
                        "
                    ></i>

                    HIPAA Compliant Portal

                </p>

            </div>

        </div>

    </div>


    <!-- ==================================================
         TRIGGER
         ================================================== -->

    <div
        class="
            flex
            items-end
            gap-3
            z-50
        "
    >

        <div
            id="trigger-bubble"
            onclick="
                window.toggleWidget()
            "
            class="
                opacity-0
                scale-95
                translate-y-3
                pointer-events-none
                bg-white
                px-4
                py-3
                rounded-2xl
                rounded-br-sm
                shadow-elegant
                border
                border-slate-100
                cursor-pointer
                transition-all
                duration-300
                relative
                max-w-[180px]
            "
            style="
                display:
                none;
            "
        >

            <span
                id="trigger-text"
                class="
                    text-[13px]
                    font-bold
                    text-premium-900
                    tracking-tight
                    leading-snug
                    block
                    m-0
                "
            >
                Have questions?
                We’re online and happy to help
            </span>

        </div>


        <button
            type="button"
            id="trigger-btn"
            onclick="
                window.toggleWidget()
            "
            style="
                position:
                relative;

                box-shadow:
                0px 15px 35px -5px
                rgba(
                    15,
                    87,
                    188,
                    0.25
                );
            "
        >

            <div
                id="icon-default"
                style="
                    width:
                    54px;

                    height:
                    54px;

                    border-radius:
                    50%;

                    overflow:
                    hidden;

                    border:
                    3px solid white;

                    background-color:
                    white;

                    position:
                    absolute;

                    top:
                    0;

                    left:
                    0;

                    display:
                    block;
                "
            >

                <img
                    src="https://assets.cdn.filesafe.space/jwSB6dgnvqYwCtaIHqjF/media/6a70e1c1a1aa89ccfe046ba2.png"
                    alt="Chat with us"
                    style="
                        width:
                        100%;

                        height:
                        100%;

                        object-fit:
                        cover;

                        display:
                        block;

                        border-radius:
                        50%;
                    "
                >

            </div>


            <div
                id="icon-active"
                style="
                    display:
                    none;

                    width:
                    54px;

                    height:
                    54px;

                    border-radius:
                    50%;

                    background-color:
                    #0f57bc !important;

                    position:
                    absolute;

                    top:
                    0;

                    left:
                    0;

                    align-items:
                    center;

                    justify-content:
                    center;
                "
            >

                <i
                    data-lucide="x"
                    style="
                        width:
                        24px;

                        height:
                        24px;

                        color:
                        white;
                    "
                ></i>

            </div>


            <span
                id="trigger-dot"
                class="
                    absolute
                    bottom-0
                    right-0
                    w-3.5
                    h-3.5
                    bg-accent-500
                    border-2
                    border-white
                    rounded-full
                    status-dot
                    z-10
                "
            ></span>


            <span
                id="notification-badge"
                class="
                    absolute
                    -top-1
                    -right-1
                    h-4
                    w-4
                    items-center
                    justify-center
                    rounded-full
                    bg-accent-500
                    text-[10px]
                    font-bold
                    text-white
                    shadow-sm
                    opacity-0
                    scale-0
                    transition-all
                    duration-300
                    z-10
                    border
                    border-white
                "
                style="
                    display:
                    none;
                "
            >
                1
            </span>

        </button>

    </div>

</div>

        `;


        const root =
            holder.firstElementChild;


        root.style.setProperty(
            'visibility',
            'hidden',
            'important'
        );


        document.body.appendChild(
            root
        );


        return root;
    }


    async function boot() {

        if (!document.body) {

            requestAnimationFrame(
                boot
            );

            return;
        }


        addFont();
        installStyles();


        try {

            await loadScript(
                PDA_TAILWIND_ID,
                'https://cdn.tailwindcss.com',
                () =>
                    !!window.tailwind
            );


            if (
                window.tailwind
            ) {

                window.tailwind.config = {

                    important:
                        '#pda-chatbot-widget',

                    corePlugins: {

                        preflight:
                            false

                    },

                    theme: {

                        extend: {

                            fontFamily: {

                                sans: [
                                    '"Plus Jakarta Sans"',
                                    'Arial',
                                    'sans-serif'
                                ]

                            },


                            colors: {

                                premium: {

                                    50:
                                        '#f8fafc',

                                    100:
                                        '#f1f5f9',

                                    200:
                                        '#e2e8f0',

                                    800:
                                        '#23323e',

                                    900:
                                        '#304454',

                                    950:
                                        '#1b2731'

                                },


                                accent: {

                                    400:
                                        '#3273d1',

                                    500:
                                        '#0f57bc',

                                    600:
                                        '#0d4a9f'

                                }

                            },


                            boxShadow: {

                                elegant:
                                    '0px 30px 60px -15px rgba(0,0,0,.4), 0px 10px 30px -5px rgba(0,0,0,.2)',

                                trigger:
                                    '0px 15px 35px -5px rgba(15,87,188,.35)',

                                card:
                                    '0px 4px 20px -2px rgba(0,0,0,.05)'

                            }

                        }

                    }

                };

            }


            const root =
                installMarkup();


            await loadScript(
                PDA_LUCIDE_ID,
                'https://unpkg.com/lucide@latest',
                () =>
                    !!window.lucide
            );


            /* ==================================================
               CHATBOT LOGIC
               ================================================== */

            (function () {


                /* ==============================================
                   STATE
                   ============================================== */

                window.pdaBotState = {

                    schedule: {

                        patient_type:
                            '',

                        reason:
                            '',

                        other_reason:
                            '',

                        best_time:
                            ''

                    },


                    emergency: {

                        symptom:
                            ''

                    },


                    reschedule: {

                        current_time:
                            ''

                    }

                };


                /* ==============================================
                   EXACT WEBHOOKS
                   ============================================== */

                const WEBHOOK_URL =
                    'https://api.mikemathewscmo.com/webhook/pda-website-chatbot';


                const QUESTION_WEBHOOK_URL =
                    'https://api.mikemathewscmo.com/webhook/pda-website-askquestion';


                const NOTIFICATION_SOUND_URL =
                    'https://assets.cdn.filesafe.space/pavIFdgrv0CTos4BgVKm/media/6a01a85abc1f77cc3588852a.mp3';


                const MESSAGE_SOUND_URL =
                    'https://assets.cdn.filesafe.space/pavIFdgrv0CTos4BgVKm/media/6a3ec3a6d50c4ff184ddb813.mp3';


                const PDA_OFFICE_PHONE =
                    '7182181060';


                const wait =
                    ms =>
                        new Promise(
                            resolve =>
                                setTimeout(
                                    resolve,
                                    ms
                                )
                        );


                let isWidgetOpen =
                    false;

                let hasPlayedSound =
                    false;

                let badgeVisible =
                    false;

                let audioUnlocked =
                    false;


                const dingAudio =
                    new Audio(
                        NOTIFICATION_SOUND_URL
                    );


                const msgAudio =
                    new Audio(
                        MESSAGE_SOUND_URL
                    );


                /* ==============================================
                   TRACKING
                   ============================================== */

                function createTrackingId(
                    prefix
                ) {

                    return (

                        prefix
                        +
                        '-'
                        +
                        (
                            typeof crypto !==
                                'undefined'
                            &&
                            crypto.randomUUID

                                ?

                                crypto.randomUUID()

                                :

                                Date.now()
                                +
                                '-'
                                +
                                Math.random()
                                    .toString(36)
                                    .substr(
                                        2,
                                        9
                                    )
                        )
                    );

                }


                function getChatVisitorId() {

                    let id =
                        localStorage
                            .getItem(
                                'pdaChatVisitorId'
                            );


                    if (!id) {

                        id =
                            createTrackingId(
                                'visitor'
                            );


                        localStorage
                            .setItem(
                                'pdaChatVisitorId',
                                id
                            );

                    }


                    return id;
                }


                function getChatSessionId() {

                    let id =
                        localStorage
                            .getItem(
                                'chatSessionId'
                            );


                    if (!id) {

                        id =
                            createTrackingId(
                                'sid'
                            );


                        localStorage
                            .setItem(
                                'chatSessionId',
                                id
                            );

                    }


                    return id;
                }


                function getSavedFirstName() {

                    const name =
                        localStorage
                            .getItem(
                                'pdaBotName'
                            );


                    if (!name) {

                        return null;
                    }


                    const first =
                        name
                            .split(' ')[0];


                    return (

                        first
                            .charAt(0)
                            .toUpperCase()

                        +

                        first
                            .slice(1)

                    );

                }


                /* ==============================================
                   INITIALIZATION
                   ============================================== */

                function initArchieWidget() {

                    if (
                        typeof lucide !==
                            'undefined'
                        &&
                        lucide.createIcons
                    ) {

                        lucide.createIcons();
                    }


                    dingAudio.load();
                    msgAudio.load();


                    const panel =
                        document
                            .getElementById(
                                'widget-panel'
                            );


                    const triggerBubble =
                        document
                            .getElementById(
                                'trigger-bubble'
                            );


                    const bentoView =
                        document
                            .getElementById(
                                'bento-view'
                            );


                    const chatView =
                        document
                            .getElementById(
                                'chat-view'
                            );


                    const chatHistory =
                        document
                            .getElementById(
                                'chat-history'
                            );


                    const triggerText =
                        document
                            .getElementById(
                                'trigger-text'
                            );


                    const iconDefault =
                        document
                            .getElementById(
                                'icon-default'
                            );


                    const iconActive =
                        document
                            .getElementById(
                                'icon-active'
                            );


                    const triggerDot =
                        document
                            .getElementById(
                                'trigger-dot'
                            );


                    const notificationBadge =
                        document
                            .getElementById(
                                'notification-badge'
                            );


                    const chatHeaderTitle =
                        document
                            .getElementById(
                                'chat-header-title'
                            );


                    const stepIndicator =
                        document
                            .getElementById(
                                'step-indicator'
                            );


                    const navBackBtn =
                        document
                            .getElementById(
                                'nav-back-btn'
                            );


                    const savedName =
                        getSavedFirstName();


                    if (
                        savedName
                    ) {

                        if (
                            triggerText
                        ) {

                            triggerText.innerHTML =
                                `Welcome back, ${savedName}! We're online to help.`;

                        }


                        const wb =
                            document
                                .getElementById(
                                    'welcome-bubble'
                                );


                        if (wb) {

                            wb.innerHTML =
                                `Welcome back, ${savedName}! Welcome to Plaza Dental Arts. I'm here to help you get scheduled, answer questions, or connect you with our team.`;

                        }

                    }


                    /* ==========================================
                       SOUND
                       ========================================== */

                    function playMessageSound() {

                        const sound =
                            msgAudio.cloneNode();


                        sound.volume =
                            0.4;


                        sound
                            .play()
                            .catch(
                                () => {}
                            );

                    }


                    function attemptDing() {

                        if (
                            hasPlayedSound
                        ) {

                            return;
                        }


                        const promise =
                            dingAudio.play();


                        if (
                            promise !==
                            undefined
                        ) {

                            promise

                                .then(
                                    () => {

                                        hasPlayedSound =
                                            true;

                                    }
                                )

                                .catch(
                                    () => {}
                                );

                        }

                    }


                    function triggerNotification() {

                        if (
                            isWidgetOpen
                            ||
                            badgeVisible
                        ) {

                            return;
                        }


                        badgeVisible =
                            true;


                        if (
                            notificationBadge
                        ) {

                            notificationBadge.style.display =
                                'flex';


                            setTimeout(
                                () => {

                                    notificationBadge
                                        .classList
                                        .remove(
                                            'opacity-0',
                                            'scale-0'
                                        );


                                    notificationBadge
                                        .classList
                                        .add(
                                            'opacity-100',
                                            'scale-100'
                                        );

                                },
                                10
                            );

                        }


                        if (
                            triggerBubble
                        ) {

                            triggerBubble.style.display =
                                'block';


                            setTimeout(
                                () => {

                                    triggerBubble
                                        .classList
                                        .remove(
                                            'opacity-0',
                                            'scale-95',
                                            'translate-y-3',
                                            'pointer-events-none'
                                        );


                                    triggerBubble
                                        .classList
                                        .add(
                                            'animate-attention'
                                        );


                                    setTimeout(
                                        () =>

                                            triggerBubble
                                                .classList
                                                .remove(
                                                    'animate-attention'
                                                ),

                                        1000
                                    );

                                },
                                10
                            );

                        }


                        attemptDing();
                    }


                    setTimeout(
                        triggerNotification,
                        3000
                    );


                    const unlockAudio =
                        () => {

                            if (
                                audioUnlocked
                            ) {

                                return;
                            }


                            audioUnlocked =
                                true;


                            if (
                                !hasPlayedSound
                                &&
                                badgeVisible
                            ) {

                                attemptDing();
                            }


                            [
                                'click',
                                'keydown',
                                'touchstart',
                                'scroll',
                                'mousemove',
                                'wheel'
                            ]
                                .forEach(
                                    eventName =>

                                        document
                                            .removeEventListener(
                                                eventName,
                                                unlockAudio
                                            )
                                );

                        };


                    [
                        'click',
                        'keydown',
                        'touchstart',
                        'scroll',
                        'mousemove',
                        'wheel'
                    ]
                        .forEach(
                            eventName =>

                                document
                                    .addEventListener(
                                        eventName,
                                        unlockAudio,
                                        {
                                            passive:
                                                true
                                        }
                                    )
                        );


                    /* ==========================================
                       OPEN / CLOSE
                       ========================================== */

                    window.toggleWidget =
                        function () {

                            isWidgetOpen =
                                !isWidgetOpen;


                            if (
                                isWidgetOpen
                                &&
                                !hasPlayedSound
                            ) {

                                attemptDing();
                            }


                            if (
                                isWidgetOpen
                            ) {

                                panel.style.display =
                                    'flex';


                                setTimeout(
                                    () => {

                                        panel
                                            .classList
                                            .remove(
                                                'widget-hidden'
                                            );


                                        panel
                                            .classList
                                            .add(
                                                'widget-visible'
                                            );

                                    },
                                    10
                                );


                                triggerBubble.style.display =
                                    'none';


                                iconDefault.style.display =
                                    'none';


                                iconActive.style.display =
                                    'flex';


                                triggerDot.style.display =
                                    'none';


                                notificationBadge
                                    .classList
                                    .add(
                                        'opacity-0',
                                        'scale-0'
                                    );


                                notificationBadge
                                    .classList
                                    .remove(
                                        'opacity-100',
                                        'scale-100'
                                    );


                            } else {

                                panel
                                    .classList
                                    .remove(
                                        'widget-visible'
                                    );


                                panel
                                    .classList
                                    .add(
                                        'widget-hidden'
                                    );


                                setTimeout(
                                    () => {

                                        panel.style.display =
                                            'none';


                                        chatView
                                            .classList
                                            .add(
                                                'opacity-0',
                                                'translate-x-full',
                                                'pointer-events-none'
                                            );


                                        chatView
                                            .classList
                                            .remove(
                                                'opacity-100',
                                                'translate-x-0'
                                            );


                                        bentoView
                                            .classList
                                            .add(
                                                'opacity-100',
                                                'translate-x-0'
                                            );


                                        bentoView
                                            .classList
                                            .remove(
                                                'opacity-0',
                                                '-translate-x-10',
                                                'pointer-events-none'
                                            );


                                        document
                                            .getElementById(
                                                'hipaa-footer'
                                            )
                                            .style
                                            .display =
                                            '';


                                        document
                                            .getElementById(
                                                'chat-input-area'
                                            )
                                            .style
                                            .setProperty(
                                                'display',
                                                'none',
                                                'important'
                                            );

                                    },
                                    250
                                );


                                triggerBubble.style.display =
                                    'block';


                                triggerBubble
                                    .classList
                                    .remove(
                                        'opacity-0',
                                        'scale-95',
                                        'translate-y-3',
                                        'pointer-events-none'
                                    );


                                triggerText.innerHTML =

                                    savedName

                                        ?

                                        `Welcome back, ${savedName}! We're online to help.`

                                        :

                                        "Have questions? We’re online and happy to help";


                                iconActive.style.display =
                                    'none';


                                iconDefault.style.display =
                                    'block';


                                triggerDot.style.display =
                                    'block';

                            }

                        };


                    /* ==========================================
                       CHAT HELPERS
                       ========================================== */

                    const getBotAvatarHTML =
                        () => `

                        <div
                            class="
                                pda-message-avatar
                                w-7
                                h-7
                                rounded-full
                                overflow-hidden
                                shrink-0
                                mt-1
                                shadow-sm
                                bg-white
                                border
                                border-slate-100
                            "
                            style="
                                background-color:
                                white !important;
                            "
                        >

                            <img
                                src="https://assets.cdn.filesafe.space/jwSB6dgnvqYwCtaIHqjF/media/6a70e1c1a1aa89ccfe046ba2.png"
                                alt="Zoey"
                                class="
                                    w-full
                                    h-full
                                    object-cover
                                "
                            >

                        </div>

                        `;


                    function appendBotMessage(
                        text
                    ) {

                        if (
                            isWidgetOpen
                        ) {

                            playMessageSound();
                        }


                        chatHistory
                            .insertAdjacentHTML(
                                'beforeend',

                                `

                                <div
                                    class="
                                        flex
                                        gap-2.5
                                        w-[90%]
                                        animate-message
                                        shrink-0
                                    "
                                >

                                    ${getBotAvatarHTML()}


                                    <div
                                        class="
                                            bg-white
                                            border
                                            border-slate-100
                                            rounded-2xl
                                            rounded-tl-sm
                                            p-3.5
                                            shadow-card
                                            text-[13.5px]
                                            text-slate-700
                                            leading-relaxed
                                            font-medium
                                        "
                                    >
                                        ${text}
                                    </div>

                                </div>

                                `
                            );


                        setTimeout(
                            () => {

                                chatHistory.scrollTo({

                                    top:
                                        chatHistory
                                            .scrollHeight,

                                    behavior:
                                        'smooth'

                                });


                                window
                                    .appBot
                                    .updateScrollArrow();

                            },
                            150
                        );

                    }


                    function appendUserMessage(
                        text
                    ) {

                        chatHistory
                            .insertAdjacentHTML(
                                'beforeend',

                                `

                                <div
                                    class="
                                        flex
                                        gap-2
                                        w-[85%]
                                        self-end
                                        justify-end
                                        animate-message
                                        shrink-0
                                    "
                                >

                                    <div
                                        class="
                                            bg-[#0f57bc]
                                            text-white
                                            rounded-2xl
                                            rounded-tr-sm
                                            p-3.5
                                            shadow-sm
                                            text-[13.5px]
                                            leading-relaxed
                                            font-medium
                                        "
                                    >
                                        ${text}
                                    </div>

                                </div>

                                `
                            );


                        setTimeout(
                            () => {

                                chatHistory.scrollTo({

                                    top:
                                        chatHistory
                                            .scrollHeight,

                                    behavior:
                                        'smooth'

                                });


                                window
                                    .appBot
                                    .updateScrollArrow();

                            },
                            150
                        );

                    }


                    function showTypingIndicator() {

                        const typingId =
                            'typing-' +
                            Date.now();


                        chatHistory
                            .insertAdjacentHTML(
                                'beforeend',

                                `

                                <div
                                    id="${typingId}"
                                    class="
                                        flex
                                        gap-2.5
                                        w-[90%]
                                        animate-message
                                        shrink-0
                                    "
                                >

                                    ${getBotAvatarHTML()}


                                    <div
                                        class="
                                            bg-white
                                            border
                                            border-slate-100
                                            rounded-2xl
                                            rounded-tl-sm
                                            p-3.5
                                            shadow-card
                                            flex
                                            items-center
                                            h-[42px]
                                        "
                                    >

                                        <div
                                            class="
                                                typing-dots
                                            "
                                        >
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>

                                    </div>

                                </div>

                                `
                            );


                        setTimeout(
                            () => {

                                chatHistory.scrollTo({

                                    top:
                                        chatHistory
                                            .scrollHeight,

                                    behavior:
                                        'smooth'

                                });


                                window
                                    .appBot
                                    .updateScrollArrow();

                            },
                            150
                        );


                        return typingId;
                    }


                    function removeTypingIndicator(
                        id
                    ) {

                        const element =
                            document
                                .getElementById(
                                    id
                                );


                        if (
                            element
                        ) {

                            element.remove();
                        }

                    }


                    async function appendBotMessageWithTyping(
                        text,
                        delayMs = 1200
                    ) {

                        const typingId =
                            showTypingIndicator();


                        return new Promise(
                            resolve => {

                                setTimeout(
                                    () => {

                                        removeTypingIndicator(
                                            typingId
                                        );


                                        appendBotMessage(
                                            text
                                        );


                                        resolve();

                                    },
                                    delayMs
                                );

                            }
                        );

                    }


                    function appendOptions(
                        id,
                        html
                    ) {

                        chatHistory
                            .insertAdjacentHTML(
                                'beforeend',

                                `

                                <div
                                    id="${id}"
                                    class="
                                        flex
                                        flex-col
                                        w-full
                                        animate-message
                                        mt-1
                                        shrink-0
                                    "
                                >
                                    ${html}
                                </div>

                                `
                            );


                        if (
                            typeof lucide !==
                                'undefined'
                            &&
                            lucide.createIcons
                        ) {

                            lucide.createIcons();
                        }


                        setTimeout(
                            () => {

                                chatHistory.scrollTo({

                                    top:
                                        chatHistory
                                            .scrollHeight,

                                    behavior:
                                        'smooth'

                                });


                                window
                                    .appBot
                                    .updateScrollArrow();

                            },
                            150
                        );

                    }


                    if (
                        chatHistory
                    ) {

                        chatHistory
                            .addEventListener(
                                'scroll',
                                () =>

                                    window
                                        .appBot
                                        .updateScrollArrow()
                            );

                    }


                    /* ==========================================
                       APP BOT
                       ========================================== */

                    window.appBot = {

                        currentFlow:
                            null,


                        updateScrollArrow:
                            function () {

                                const button =
                                    document
                                        .getElementById(
                                            'scroll-down-btn'
                                        );


                                const history =
                                    document
                                        .getElementById(
                                            'chat-history'
                                        );


                                if (
                                    !button
                                    ||
                                    !history
                                ) {

                                    return;
                                }


                                if (

                                    history.scrollHeight >
                                        history.clientHeight

                                    &&

                                    Math.ceil(
                                        history.scrollHeight
                                        -
                                        history.scrollTop
                                    )

                                    >

                                    history.clientHeight
                                    +
                                    15
                                ) {

                                    button
                                        .style
                                        .setProperty(
                                            'display',
                                            'flex',
                                            'important'
                                        );

                                } else {

                                    button
                                        .style
                                        .setProperty(
                                            'display',
                                            'none',
                                            'important'
                                        );

                                }

                            },


                        goBack:
                            function () {

                                document
                                    .getElementById(
                                        'hipaa-footer'
                                    )
                                    .style
                                    .display =
                                    '';


                                document
                                    .getElementById(
                                        'chat-input-area'
                                    )
                                    .style
                                    .setProperty(
                                        'display',
                                        'none',
                                        'important'
                                    );


                                chatView
                                    .classList
                                    .remove(
                                        'opacity-100',
                                        'translate-x-0'
                                    );


                                chatView
                                    .classList
                                    .add(
                                        'opacity-0',
                                        'translate-x-full',
                                        'pointer-events-none'
                                    );


                                bentoView
                                    .classList
                                    .remove(
                                        'opacity-0',
                                        '-translate-x-10',
                                        'pointer-events-none'
                                    );


                                bentoView
                                    .classList
                                    .add(
                                        'opacity-100',
                                        'translate-x-0'
                                    );

                            },


                        startFlow:
                            async function (
                                flowType
                            ) {

                                document
                                    .getElementById(
                                        'chat-input-area'
                                    )
                                    .style
                                    .setProperty(
                                        'display',
                                        'none',
                                        'important'
                                    );


                                document
                                    .getElementById(
                                        'hipaa-footer'
                                    )
                                    .style
                                    .display =
                                    '';


                                document
                                    .getElementById(
                                        'scroll-down-btn'
                                    )
                                    .style
                                    .setProperty(
                                        'display',
                                        'none',
                                        'important'
                                    );


                                bentoView
                                    .classList
                                    .remove(
                                        'opacity-100',
                                        'translate-x-0'
                                    );


                                bentoView
                                    .classList
                                    .add(
                                        'opacity-0',
                                        '-translate-x-10',
                                        'pointer-events-none'
                                    );


                                chatView
                                    .classList
                                    .remove(
                                        'opacity-0',
                                        'translate-x-full',
                                        'pointer-events-none'
                                    );


                                chatView
                                    .classList
                                    .add(
                                        'opacity-100',
                                        'translate-x-0'
                                    );


                                chatHistory.innerHTML =
                                    '';


                                stepIndicator
                                    .classList
                                    .remove(
                                        'opacity-0'
                                    );


                                navBackBtn
                                    .classList
                                    .remove(
                                        'opacity-0',
                                        'pointer-events-none'
                                    );


                                navBackBtn
                                    .setAttribute(
                                        'onclick',
                                        'window.appBot.goBack()'
                                    );


                                this.currentFlow =
                                    flowType;


                                if (
                                    flowType ===
                                    'schedule'
                                ) {

                                    await this
                                        .showScheduleStep1();

                                } else if (
                                    flowType ===
                                    'emergency'
                                ) {

                                    await this
                                        .showEmergencyStep1();

                                } else if (
                                    flowType ===
                                    'reschedule'
                                ) {

                                    await this
                                        .showRescheduleFlow();

                                } else if (
                                    flowType ===
                                    'call'
                                ) {

                                    await this
                                        .showCallFlow();

                                } else if (
                                    flowType ===
                                    'question'
                                ) {

                                    await this
                                        .showQuestionForm();

                                } else if (
                                    flowType ===
                                    'reviews'
                                ) {

                                    await this
                                        .showReviewsFlow();

                                }

                            },


                        /* ======================================
                           SCHEDULE
                           ====================================== */

                        showScheduleStep1:
                            async function () {

                                chatHeaderTitle.innerText =
                                    'Schedule Appointment';


                                stepIndicator.innerText =
                                    'Step 1 of 4';


                                await appendBotMessageWithTyping(
                                    'Great! I can help you request an appointment. Are you a new or returning patient?',
                                    1200
                                );


                                await wait(
                                    400
                                );


                                const options = [

                                    'New Patient',

                                    'Returning Patient'

                                ];


                                appendOptions(

                                    'schedule-opts-1',

                                    `

                                    <div
                                        class="
                                            flex
                                            gap-2
                                            w-[90%]
                                            flex-wrap
                                            mb-2
                                            pl-[38px]
                                        "
                                    >

                                        ${
                                            options
                                                .map(
                                                    option => `

                                                    <button
                                                        type="button"
                                                        onclick="
                                                            window.appBot
                                                            .handleScheduleStep(
                                                                'patient_type',
                                                                '${option}'
                                                            )
                                                        "
                                                        class="
                                                            w-auto
                                                            bg-white
                                                            border
                                                            border-[#0f57bc]/30
                                                            rounded-full
                                                            py-1.5
                                                            px-4
                                                            text-[13px]
                                                            font-medium
                                                            text-[#0f57bc]
                                                            shadow-sm
                                                        "
                                                    >
                                                        ${option}
                                                    </button>

                                                    `
                                                )
                                                .join('')
                                        }

                                    </div>

                                    `
                                );

                            },


                        handleScheduleStep:
                            async function (
                                field,
                                value
                            ) {

                                window
                                    .pdaBotState
                                    .schedule[field] =
                                    value;


                                const containerId =

                                    field ===
                                        'patient_type'

                                        ?

                                        'schedule-opts-1'

                                        :

                                    field ===
                                        'reason'

                                        ?

                                        'schedule-opts-2'

                                        :

                                        'schedule-opts-3';


                                const container =
                                    document
                                        .getElementById(
                                            containerId
                                        );


                                if (
                                    container
                                ) {

                                    container.remove();
                                }


                                appendUserMessage(
                                    value
                                );


                                await wait(
                                    400
                                );


                                if (
                                    field ===
                                    'patient_type'
                                ) {

                                    await this
                                        .showScheduleStep2();

                                } else if (
                                    field ===
                                    'reason'
                                ) {

                                    if (
                                        value ===
                                        'Other'
                                    ) {

                                        await this
                                            .askForOtherReason();

                                    } else {

                                        await this
                                            .showScheduleStep3();

                                    }

                                } else if (
                                    field ===
                                    'best_time'
                                ) {

                                    await this
                                        .showScheduleStep4();

                                }

                            },


                        showScheduleStep2:
                            async function () {

                                stepIndicator.innerText =
                                    'Step 2 of 4';


                                await appendBotMessageWithTyping(
                                    'Got it. What is the main reason for your visit?',
                                    1000
                                );


                                await wait(
                                    600
                                );


                                const procedures = [

                                    'Checkup & Cleaning',

                                    'Tooth Pain / Emergency',

                                    'Teeth Whitening',

                                    'Invisalign',

                                    'Cosmetic Consultation',

                                    'Other'

                                ];


                                let html = `

                                    <div
                                        class="
                                            flex
                                            gap-2
                                            w-[90%]
                                            flex-wrap
                                            mb-2
                                            pl-[38px]
                                        "
                                    >

                                `;


                                procedures.forEach(
                                    option => {

                                        html += `

                                        <button
                                            type="button"
                                            onclick="
                                                window.appBot
                                                .handleScheduleStep(
                                                    'reason',
                                                    '${option}'
                                                )
                                            "
                                            class="
                                                w-auto
                                                bg-white
                                                border
                                                border-[#0f57bc]/30
                                                rounded-full
                                                py-1.5
                                                px-4
                                                text-[13px]
                                                font-medium
                                                text-[#0f57bc]
                                                shadow-sm
                                            "
                                        >
                                            ${option}
                                        </button>

                                        `;

                                    }
                                );


                                html += `
                                    </div>
                                `;


                                appendOptions(
                                    'schedule-opts-2',
                                    html
                                );

                            },


                        askForOtherReason:
                            async function () {

                                await appendBotMessageWithTyping(
                                    'Could you briefly describe the reason for your visit?',
                                    1000
                                );


                                await wait(
                                    600
                                );


                                const html = `

                                    <div
                                        class="
                                            w-[90%]
                                            pl-[38px]
                                            mt-1
                                            shrink-0
                                        "
                                    >

                                        <form
                                            onsubmit="
                                                event.preventDefault();

                                                window.appBot
                                                .handleOtherReasonSubmit(
                                                    this
                                                );
                                            "
                                            class="
                                                flex
                                                gap-2
                                                w-full
                                                m-0
                                                p-0
                                                relative
                                            "
                                        >

                                            <input
                                                type="text"
                                                name="other_reason"
                                                placeholder="Type your reason..."
                                                required
                                                autocomplete="off"
                                                class="
                                                    w-full
                                                    bg-white
                                                    border
                                                    border-[#0f57bc]/30
                                                    text-[13.5px]
                                                    rounded-full
                                                    py-2.5
                                                    pl-4
                                                    pr-12
                                                    text-slate-700
                                                    shadow-sm
                                                    m-0
                                                "
                                            >


                                            <button
                                                type="submit"
                                                class="
                                                    absolute
                                                    right-1
                                                    top-1
                                                    bottom-1
                                                    p-2
                                                    bg-[#0f57bc]
                                                    text-white
                                                    rounded-full
                                                    flex
                                                    items-center
                                                    justify-center
                                                    m-0
                                                "
                                                style="
                                                    border:
                                                    none !important;
                                                "
                                            >

                                                <i
                                                    data-lucide="arrow-right"
                                                    class="
                                                        w-3.5
                                                        h-3.5
                                                    "
                                                ></i>

                                            </button>

                                        </form>

                                    </div>

                                `;


                                appendOptions(
                                    'schedule-opts-other-container',
                                    html
                                );

                            },


                        handleOtherReasonSubmit:
                            async function (
                                form
                            ) {

                                const formData =
                                    new FormData(
                                        form
                                    );


                                const reason =
                                    String(
                                        formData
                                            .get(
                                                'other_reason'
                                            )
                                        ||
                                        ''
                                    ).trim();


                                if (!reason) {

                                    return;
                                }


                                window
                                    .pdaBotState
                                    .schedule
                                    .reason =
                                    'Other';


                                window
                                    .pdaBotState
                                    .schedule
                                    .other_reason =
                                    reason;


                                const container =
                                    document
                                        .getElementById(
                                            'schedule-opts-other-container'
                                        );


                                if (
                                    container
                                ) {

                                    container.remove();
                                }


                                appendUserMessage(
                                    reason
                                );


                                await wait(
                                    400
                                );


                                await this
                                    .showScheduleStep3();

                            },


                        showScheduleStep3:
                            async function () {

                                stepIndicator.innerText =
                                    'Step 3 of 4';


                                await appendBotMessageWithTyping(
                                    'When do you prefer to come in?',
                                    1000
                                );


                                await wait(
                                    600
                                );


                                const options = [

                                    'Morning',

                                    'Afternoon',

                                    'Next Available'

                                ];


                                appendOptions(

                                    'schedule-opts-3',

                                    `

                                    <div
                                        class="
                                            flex
                                            gap-2
                                            w-[90%]
                                            flex-wrap
                                            mb-2
                                            pl-[38px]
                                        "
                                    >

                                        ${
                                            options
                                                .map(
                                                    option => `

                                                    <button
                                                        type="button"
                                                        onclick="
                                                            window.appBot
                                                            .handleScheduleStep(
                                                                'best_time',
                                                                '${option}'
                                                            )
                                                        "
                                                        class="
                                                            w-auto
                                                            bg-white
                                                            border
                                                            border-[#0f57bc]/30
                                                            rounded-full
                                                            py-1.5
                                                            px-4
                                                            text-[13px]
                                                            font-medium
                                                            text-[#0f57bc]
                                                            shadow-sm
                                                        "
                                                    >
                                                        ${option}
                                                    </button>

                                                    `
                                                )
                                                .join('')
                                        }

                                    </div>

                                    `
                                );

                            },


                        /* ======================================
                           SCHEDULE FINAL FORM
                           AUTO SCROLL RESTORED
                           ====================================== */

                        showScheduleStep4:
                            async function () {

                                stepIndicator.innerText =
                                    'Step 4 of 4';


                                await appendBotMessageWithTyping(
                                    'Perfect. Please enter your contact information and our scheduling team will reach out to confirm your exact time.',
                                    1200
                                );


                                await wait(
                                    800
                                );


                                chatHistory
                                    .insertAdjacentHTML(
                                        'beforeend',

                                        `

                                        <div
                                            class="
                                                flex
                                                flex-col
                                                items-center
                                                w-full
                                                animate-message
                                                mt-3
                                                shrink-0
                                            "
                                            id="schedule-form-4"
                                        >

                                            <form
                                                onsubmit="
                                                    event.preventDefault();

                                                    window.appBot
                                                    .submitSchedule(
                                                        this
                                                    );
                                                "
                                                class="
                                                    w-full
                                                    bg-white
                                                    border
                                                    border-slate-100
                                                    p-4
                                                    rounded-2xl
                                                    shadow-card
                                                    m-0
                                                "
                                            >

                                                <input
                                                    type="text"
                                                    name="name"
                                                    placeholder="Full Name"
                                                    required
                                                    class="
                                                        chat-input-field
                                                    "
                                                    value="${savedName || ''}"
                                                >


                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    placeholder="Phone Number"
                                                    required
                                                    class="
                                                        chat-input-field
                                                    "
                                                >


                                                <input
                                                    type="email"
                                                    name="email"
                                                    placeholder="Email Address (Optional)"
                                                    class="
                                                        chat-input-field
                                                    "
                                                >


                                                <button
                                                    type="submit"
                                                    class="
                                                        w-full
                                                        bg-[#0f57bc]
                                                        text-white
                                                        font-bold
                                                        py-3.5
                                                        rounded-xl
                                                    "
                                                    style="
                                                        border:
                                                        none !important;
                                                    "
                                                >
                                                    Request Appointment
                                                </button>

                                            </form>

                                        </div>

                                        `
                                    );


                                if (
                                    typeof lucide !==
                                        'undefined'
                                    &&
                                    lucide.createIcons
                                ) {

                                    lucide.createIcons();
                                }


                                this.updateScrollArrow();


                                setTimeout(
                                    () => {

                                        const history =
                                            document
                                                .getElementById(
                                                    'chat-history'
                                                );


                                        if (
                                            history
                                        ) {

                                            history.scrollTo({

                                                top:
                                                    history
                                                        .scrollHeight,

                                                behavior:
                                                    'smooth'

                                            });


                                            window
                                                .appBot
                                                .updateScrollArrow();

                                        }

                                    },
                                    1500
                                );

                            },


                        /* ======================================
                           EMERGENCY
                           ====================================== */

                        showEmergencyStep1:
                            async function () {

                                chatHeaderTitle.innerText =
                                    'Dental Emergency';


                                stepIndicator.innerText =
                                    'Step 1 of 2';


                                await appendBotMessageWithTyping(
                                    "I'm sorry to hear you're experiencing a dental emergency. What are your main symptoms?",
                                    1200
                                );


                                await wait(
                                    400
                                );


                                const options = [

                                    'Severe Pain',

                                    'Swelling / Infection',

                                    'Broken Tooth',

                                    'Other Urgent Issue'

                                ];


                                appendOptions(

                                    'emergency-opts-1',

                                    `

                                    <div
                                        class="
                                            flex
                                            gap-2
                                            w-[90%]
                                            flex-wrap
                                            mb-2
                                            pl-[38px]
                                        "
                                    >

                                        ${
                                            options
                                                .map(
                                                    option => `

                                                    <button
                                                        type="button"
                                                        onclick="
                                                            window.appBot
                                                            .handleEmergencyStep(
                                                                '${option}'
                                                            )
                                                        "
                                                        class="
                                                            w-auto
                                                            bg-white
                                                            border
                                                            border-red-200
                                                            rounded-full
                                                            py-1.5
                                                            px-4
                                                            text-[13px]
                                                            font-medium
                                                            text-red-700
                                                            shadow-sm
                                                        "
                                                    >
                                                        ${option}
                                                    </button>

                                                    `
                                                )
                                                .join('')
                                        }

                                    </div>

                                    `
                                );

                            },


                        handleEmergencyStep:
                            async function (
                                value
                            ) {

                                const options =
                                    document
                                        .getElementById(
                                            'emergency-opts-1'
                                        );


                                if (
                                    options
                                ) {

                                    options.remove();
                                }


                                appendUserMessage(
                                    value
                                );


                                await wait(
                                    400
                                );


                                if (
                                    value ===
                                    'Other Urgent Issue'
                                ) {

                                    window
                                        .pdaBotState
                                        .emergency
                                        .symptom =
                                        'Other Urgent Issue';


                                    await this
                                        .askForEmergencyOtherSymptom();


                                    return;
                                }


                                window
                                    .pdaBotState
                                    .emergency
                                    .symptom =
                                    value;


                                await this
                                    .showEmergencyContactForm();

                            },


                        /* ======================================
                           EMERGENCY OTHER INPUT
                           ====================================== */

                        askForEmergencyOtherSymptom:
                            async function () {

                                await appendBotMessageWithTyping(
                                    'Please briefly describe what is happening so our team knows how to best assist you.',
                                    1000
                                );


                                await wait(
                                    500
                                );


                                const html = `

                                    <div
                                        class="
                                            w-[90%]
                                            pl-[38px]
                                            mt-1
                                            shrink-0
                                        "
                                    >

                                        <form
                                            onsubmit="
                                                event.preventDefault();

                                                window.appBot
                                                .handleEmergencyOtherSubmit(
                                                    this
                                                );
                                            "
                                            class="
                                                flex
                                                gap-2
                                                w-full
                                                m-0
                                                p-0
                                                relative
                                            "
                                        >

                                            <input
                                                type="text"
                                                name="emergency_other"
                                                placeholder="Tell us what is happening..."
                                                required
                                                autocomplete="off"
                                                class="
                                                    w-full
                                                    bg-white
                                                    border
                                                    border-red-200
                                                    text-[13.5px]
                                                    rounded-full
                                                    py-2.5
                                                    pl-4
                                                    pr-12
                                                    text-slate-700
                                                    shadow-sm
                                                    m-0
                                                "
                                                style="
                                                    height:
                                                    42px !important;

                                                    background:
                                                    #ffffff !important;

                                                    border:
                                                    1px solid
                                                    #fecaca !important;

                                                    border-radius:
                                                    9999px !important;
                                                "
                                            >


                                            <button
                                                type="submit"
                                                class="
                                                    absolute
                                                    right-1
                                                    top-1
                                                    bottom-1
                                                    bg-red-600
                                                    text-white
                                                    rounded-full
                                                    flex
                                                    items-center
                                                    justify-center
                                                    m-0
                                                "
                                                style="
                                                    width:
                                                    34px !important;

                                                    min-width:
                                                    34px !important;

                                                    height:
                                                    34px !important;

                                                    min-height:
                                                    34px !important;

                                                    padding:
                                                    8px !important;

                                                    border:
                                                    none !important;

                                                    background:
                                                    #dc2626 !important;
                                                "
                                            >

                                                <i
                                                    data-lucide="arrow-right"
                                                    class="
                                                        w-3.5
                                                        h-3.5
                                                    "
                                                ></i>

                                            </button>

                                        </form>

                                    </div>

                                `;


                                appendOptions(
                                    'emergency-other-container',
                                    html
                                );


                                setTimeout(
                                    () => {

                                        const history =
                                            document
                                                .getElementById(
                                                    'chat-history'
                                                );


                                        if (
                                            history
                                        ) {

                                            history.scrollTo({

                                                top:
                                                    history
                                                        .scrollHeight,

                                                behavior:
                                                    'smooth'

                                            });


                                            window
                                                .appBot
                                                .updateScrollArrow();

                                        }

                                    },
                                    500
                                );

                            },


                        handleEmergencyOtherSubmit:
                            async function (
                                form
                            ) {

                                const formData =
                                    new FormData(
                                        form
                                    );


                                const description =
                                    String(
                                        formData
                                            .get(
                                                'emergency_other'
                                            )
                                        ||
                                        ''
                                    ).trim();


                                if (
                                    !description
                                ) {

                                    return;
                                }


                                window
                                    .pdaBotState
                                    .emergency
                                    .symptom =

                                    `Other Urgent Issue: ${description}`;


                                const container =
                                    document
                                        .getElementById(
                                            'emergency-other-container'
                                        );


                                if (
                                    container
                                ) {

                                    container.remove();
                                }


                                appendUserMessage(
                                    description
                                );


                                await wait(
                                    400
                                );


                                await this
                                    .showEmergencyContactForm();

                            },


                        showEmergencyContactForm:
                            async function () {

                                stepIndicator.innerText =
                                    'Step 2 of 2';


                                await appendBotMessageWithTyping(
                                    'We prioritize emergencies. Please provide your name and phone number so we can reach you right away to get you in.',
                                    1200
                                );


                                await wait(
                                    800
                                );


                                chatHistory
                                    .insertAdjacentHTML(
                                        'beforeend',

                                        `

                                        <div
                                            class="
                                                flex
                                                flex-col
                                                items-center
                                                w-full
                                                animate-message
                                                mt-3
                                                shrink-0
                                            "
                                            id="emergency-form-2"
                                        >

                                            <form
                                                onsubmit="
                                                    event.preventDefault();

                                                    window.appBot
                                                    .submitEmergency(
                                                        this
                                                    );
                                                "
                                                class="
                                                    w-full
                                                    bg-red-50
                                                    border
                                                    border-red-100
                                                    p-4
                                                    rounded-2xl
                                                    shadow-card
                                                    m-0
                                                "
                                            >

                                                <input
                                                    type="text"
                                                    name="name"
                                                    placeholder="Full Name"
                                                    required
                                                    class="
                                                        chat-input-field
                                                    "
                                                    value="${savedName || ''}"
                                                >


                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    placeholder="Phone Number"
                                                    required
                                                    class="
                                                        chat-input-field
                                                    "
                                                >


                                                <button
                                                    type="submit"
                                                    class="
                                                        w-full
                                                        bg-red-600
                                                        text-white
                                                        font-bold
                                                        py-3.5
                                                        rounded-xl
                                                    "
                                                    style="
                                                        border:
                                                        none !important;
                                                    "
                                                >
                                                    Request Urgent Help
                                                </button>

                                            </form>

                                        </div>

                                        `
                                    );


                                this.updateScrollArrow();


                                setTimeout(
                                    () => {

                                        const history =
                                            document
                                                .getElementById(
                                                    'chat-history'
                                                );


                                        if (
                                            history
                                        ) {

                                            history.scrollTo({

                                                top:
                                                    history
                                                        .scrollHeight,

                                                behavior:
                                                    'smooth'

                                            });


                                            window
                                                .appBot
                                                .updateScrollArrow();

                                        }

                                    },
                                    1500
                                );

                            },


                        /* ======================================
                           RESCHEDULE
                           ====================================== */

                        showRescheduleFlow:
                            async function () {

                                chatHeaderTitle.innerText =
                                    'Reschedule';


                                stepIndicator.innerText =
                                    'Step 1 of 1';


                                await appendBotMessageWithTyping(
                                    "We can help you reschedule. Please provide your details and when you'd like to move your appointment to.",
                                    1200
                                );


                                await wait(
                                    800
                                );


                                chatHistory
                                    .insertAdjacentHTML(
                                        'beforeend',

                                        `

                                        <div
                                            class="
                                                flex
                                                flex-col
                                                items-center
                                                w-full
                                                animate-message
                                                mt-3
                                                shrink-0
                                            "
                                            id="reschedule-form"
                                        >

                                            <form
                                                onsubmit="
                                                    event.preventDefault();

                                                    window.appBot
                                                    .submitReschedule(
                                                        this
                                                    );
                                                "
                                                class="
                                                    w-full
                                                    bg-white
                                                    border
                                                    border-slate-100
                                                    p-4
                                                    rounded-2xl
                                                    shadow-card
                                                    m-0
                                                "
                                            >

                                                <input
                                                    type="text"
                                                    name="name"
                                                    placeholder="Full Name"
                                                    required
                                                    class="
                                                        chat-input-field
                                                    "
                                                    value="${savedName || ''}"
                                                >


                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    placeholder="Phone Number"
                                                    required
                                                    class="
                                                        chat-input-field
                                                    "
                                                >


                                                <textarea
                                                    name="requested_time"
                                                    placeholder="Requested new date & time"
                                                    required
                                                    class="
                                                        chat-input-field
                                                    "
                                                ></textarea>


                                                <button
                                                    type="submit"
                                                    class="
                                                        w-full
                                                        bg-[#0f57bc]
                                                        text-white
                                                        font-bold
                                                        py-3.5
                                                        rounded-xl
                                                    "
                                                    style="
                                                        border:
                                                        none !important;
                                                    "
                                                >
                                                    Request Reschedule
                                                </button>

                                            </form>

                                        </div>

                                        `
                                    );


                                this.updateScrollArrow();


                                setTimeout(
                                    () => {

                                        const history =
                                            document
                                                .getElementById(
                                                    'chat-history'
                                                );


                                        if (
                                            history
                                        ) {

                                            history.scrollTo({

                                                top:
                                                    history
                                                        .scrollHeight,

                                                behavior:
                                                    'smooth'

                                            });


                                            window
                                                .appBot
                                                .updateScrollArrow();

                                        }

                                    },
                                    1500
                                );

                            },


                        /* ======================================
                           CALL
                           ====================================== */

                        showCallFlow:
                            async function () {

                                chatHeaderTitle.innerText =
                                    'Call Us';


                                stepIndicator
                                    .classList
                                    .add(
                                        'opacity-0'
                                    );


                                await appendBotMessageWithTyping(
                                    'Need immediate assistance? You can reach our front desk right now by calling the office.',
                                    1000
                                );


                                await wait(
                                    500
                                );


                                appendOptions(

                                    'call-opts',

                                    `

                                    <a
                                        href="tel:${PDA_OFFICE_PHONE}"
                                        class="
                                            w-full
                                            bg-accent-500
                                            text-white
                                            px-4
                                            py-3.5
                                            rounded-[12px]
                                            text-[13.5px]
                                            font-bold
                                            shadow-sm
                                            mb-2.5
                                            flex
                                            items-center
                                            justify-center
                                            gap-2
                                        "
                                        style="
                                            border:
                                            none !important;
                                        "
                                    >

                                        <i
                                            data-lucide="phone"
                                            class="
                                                w-4
                                                h-4
                                            "
                                        ></i>

                                        Call Office Now

                                    </a>

                                    `
                                );

                            },


                        /* ======================================
                           QUESTIONS
                           EXACT QUESTION WEBHOOK
                           ====================================== */

                        showQuestionForm:
                            async function () {

                                chatHeaderTitle.innerText =
                                    'Live Chat';


                                stepIndicator
                                    .classList
                                    .add(
                                        'opacity-0'
                                    );


                                document
                                    .getElementById(
                                        'hipaa-footer'
                                    )
                                    .style
                                    .display =
                                    'none';


                                document
                                    .getElementById(
                                        'chat-input-area'
                                    )
                                    .style
                                    .setProperty(
                                        'display',
                                        'flex',
                                        'important'
                                    );


                                await appendBotMessageWithTyping(
                                    "Hi there! I'm Zoey, the AI assistant for the practice. What questions can I answer for you today?",
                                    1200
                                );


                                setTimeout(
                                    () =>

                                        document
                                            .getElementById(
                                                'live-chat-input'
                                            )
                                            .focus(),

                                    100
                                );

                            },


                        handleChatSend:
                            async function () {

                                const input =
                                    document
                                        .getElementById(
                                            'live-chat-input'
                                        );


                                const submit =
                                    document
                                        .getElementById(
                                            'live-chat-submit'
                                        );


                                const message =
                                    input
                                        .value
                                        .trim();


                                if (
                                    !message
                                ) {

                                    return;
                                }


                                input.value =
                                    '';


                                submit.disabled =
                                    true;


                                input.disabled =
                                    true;


                                appendUserMessage(
                                    message
                                );


                                const typingId =
                                    showTypingIndicator();


                                try {

                                    const controller =
                                        new AbortController();


                                    const timeoutId =
                                        setTimeout(
                                            () =>

                                                controller
                                                    .abort(),

                                            15000
                                        );


                                    const payload = {

                                        message:
                                            message,

                                        name:

                                            localStorage
                                                .getItem(
                                                    'pdaBotName'
                                                )
                                            || '',

                                        phone:
                                            '',

                                        email:
                                            '',

                                        visitorId:

                                            getChatVisitorId(),

                                        sessionId:

                                            getChatSessionId(),

                                        eventId:

                                            createTrackingId(
                                                'question'
                                            ),

                                        source:

                                            'Website Chatbot - Ask a Question',

                                        pageUrl:

                                            window
                                                .location
                                                .href,

                                        pageTitle:

                                            document
                                                .title
                                            || '',

                                        referrer:

                                            document
                                                .referrer
                                            || '',

                                        userAgent:

                                            navigator
                                                .userAgent
                                            || '',

                                        timestamp:

                                            new Date()
                                                .toISOString()

                                    };


                                    const response =
                                        await fetch(
                                            QUESTION_WEBHOOK_URL,
                                            {

                                                method:
                                                    'POST',

                                                headers: {

                                                    'Content-Type':
                                                        'application/json'

                                                },

                                                body:

                                                    JSON.stringify(
                                                        payload
                                                    ),

                                                signal:

                                                    controller
                                                        .signal

                                            }
                                        );


                                    clearTimeout(
                                        timeoutId
                                    );


                                    if (
                                        !response.ok
                                    ) {

                                        const errorText =
                                            await response
                                                .text();


                                        console.error(

                                            'Question webhook error:',

                                            response.status,

                                            errorText

                                        );


                                        throw new Error(

                                            'Question webhook returned '
                                            +
                                            response.status

                                        );
                                    }


                                    const rawText =
                                        await response
                                            .text();


                                    let data;


                                    try {

                                        data =
                                            JSON.parse(
                                                rawText
                                            );

                                    } catch (
                                        error
                                    ) {

                                        data = {

                                            reply:
                                                rawText

                                        };

                                    }


                                    removeTypingIndicator(
                                        typingId
                                    );


                                    let botReply =
                                        '';


                                    if (
                                        typeof data ===
                                        'string'
                                    ) {

                                        botReply =
                                            data;


                                    } else if (
                                        Array.isArray(
                                            data
                                        )
                                        &&
                                        data.length >
                                        0
                                    ) {

                                        botReply =

                                            data[0].reply

                                            ||

                                            data[0].message

                                            ||

                                            data[0].text

                                            ||

                                            data[0].output;


                                    } else if (
                                        data
                                        &&
                                        typeof data ===
                                        'object'
                                    ) {

                                        botReply =

                                            data.reply

                                            ||

                                            data.message

                                            ||

                                            data.text

                                            ||

                                            data.response

                                            ||

                                            data.output

                                            ||

                                            data.answer;

                                    }


                                    if (
                                        botReply
                                    ) {

                                        appendBotMessage(

                                            String(
                                                botReply
                                            )

                                                .replace(
                                                    /\n/g,
                                                    '<br>'
                                                )

                                                .replace(
                                                    /\*\*(.*?)\*\*/g,
                                                    '<strong class="font-bold text-[#0f57bc]">$1</strong>'
                                                )

                                        );


                                    } else {

                                        console.error(

                                            'Unrecognized question webhook response:',

                                            data

                                        );


                                        appendBotMessage(
                                            "I'm sorry — I wasn't able to process that response. Please try again."
                                        );

                                    }


                                } catch (
                                    error
                                ) {

                                    removeTypingIndicator(
                                        typingId
                                    );


                                    console.error(

                                        'Question webhook failed:',

                                        error

                                    );


                                    appendBotMessage(
                                        "I'm sorry — I'm having trouble connecting right now. Please try again or call the office at (718) 218-1060."
                                    );


                                } finally {

                                    submit.disabled =
                                        false;


                                    input.disabled =
                                        false;


                                    input.focus();


                                    if (
                                        typeof lucide !==
                                            'undefined'
                                        &&
                                        lucide.createIcons
                                    ) {

                                        lucide.createIcons();
                                    }

                                }

                            },


                        /* ======================================
                           REVIEWS
                           ====================================== */

                        showReviewsFlow:
                            async function () {

                                chatHeaderTitle.innerText =
                                    'Patient Reviews';


                                stepIndicator
                                    .classList
                                    .add(
                                        'opacity-0'
                                    );


                                await appendBotMessageWithTyping(
                                    'Our patients love us! We take pride in offering gentle, comprehensive care. Here is what people are saying:',
                                    1200
                                );


                                const reviews = [

                                    {
                                        name:
                                            'Raina Kavangal',

                                        time:
                                            'a month ago',

                                        text:
                                            'Had a really positive experience with Dr. Aryan. He is super nice, very knowledgeable, and you can tell he genuinely cares. He takes the time to explain everything...'
                                    },

                                    {
                                        name:
                                            'Fiona Hannan',

                                        time:
                                            '6 months ago',

                                        text:
                                            "Dr. Aryan's office was a lighthouse amongst the many negative experiences I have had at doctor's offices. The environment was welcoming..."
                                    },

                                    {
                                        name:
                                            'Jake Stout',

                                        time:
                                            'a month ago',

                                        text:
                                            'Dr aryan is amazing! Very laidback and shares lots of knowledge about your particular situation... Made me feel heard and like I was in good hands.'
                                    },

                                    {
                                        name:
                                            'Borzoo TabiB',

                                        time:
                                            '6 months ago',

                                        text:
                                            'I had an excellent experience with Dr. Mehdi and his team for my dental cleaning. From the moment I walked in, the office was welcoming...'
                                    }

                                ];


                                let html = `

                                    <div
                                        class="
                                            relative
                                            w-[calc(100%+2.5rem)]
                                            -ml-5
                                            px-5
                                            mt-2
                                            shrink-0
                                        "
                                    >

                                        <div
                                            class="
                                                flex
                                                overflow-x-auto
                                                gap-3
                                                pb-4
                                                pt-1
                                                snap-x
                                                snap-mandatory
                                                hide-scrollbar
                                            "
                                        >

                                `;


                                const starSVG = `

                                    <svg
                                        class="
                                            w-3.5
                                            h-3.5
                                            fill-current
                                        "
                                        viewBox="0 0 20 20"
                                    >

                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                        ></path>

                                    </svg>

                                `;


                                const stars = `

                                    <div
                                        class="
                                            flex
                                            gap-0.5
                                            mb-2
                                            text-[#fbbc05]
                                        "
                                    >

                                        ${starSVG}
                                        ${starSVG}
                                        ${starSVG}
                                        ${starSVG}
                                        ${starSVG}

                                    </div>

                                `;


                                reviews
                                    .forEach(
                                        review => {

                                            html += `

                                            <div
                                                class="
                                                    snap-center
                                                    shrink-0
                                                    w-[260px]
                                                    bg-white
                                                    border
                                                    border-slate-200
                                                    shadow-sm
                                                    rounded-2xl
                                                    p-4
                                                    flex
                                                    flex-col
                                                "
                                            >

                                                <div
                                                    class="
                                                        flex
                                                        justify-between
                                                        items-start
                                                        mb-1.5
                                                    "
                                                >

                                                    <div
                                                        class="
                                                            flex
                                                            flex-col
                                                        "
                                                    >

                                                        <span
                                                            class="
                                                                font-bold
                                                                text-premium-900
                                                                text-[13.5px]
                                                            "
                                                        >
                                                            ${review.name}
                                                        </span>


                                                        <span
                                                            class="
                                                                text-slate-400
                                                                text-[10.5px]
                                                            "
                                                        >
                                                            ${review.time}
                                                        </span>

                                                    </div>


                                                    <img
                                                        src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                                                        alt="Google"
                                                        class="
                                                            w-4
                                                            h-4
                                                            object-contain
                                                            shrink-0
                                                        "
                                                    >

                                                </div>


                                                ${stars}


                                                <p
                                                    class="
                                                        text-[12.5px]
                                                        text-slate-600
                                                        leading-relaxed
                                                        italic
                                                        flex-1
                                                        m-0
                                                    "
                                                >
                                                    "${review.text}"
                                                </p>

                                            </div>

                                            `;

                                        }
                                    );


                                html += `

                                        </div>

                                    </div>

                                `;


                                chatHistory
                                    .insertAdjacentHTML(
                                        'beforeend',
                                        html
                                    );


                                await wait(
                                    1500
                                );


                                appendOptions(

                                    'review-opts',

                                    `

                                    <button
                                        type="button"
                                        onclick="
                                            window.appBot
                                            .startFlow(
                                                'schedule'
                                            )
                                        "
                                        class="
                                            w-full
                                            bg-[#0f57bc]
                                            text-white
                                            px-4
                                            py-3.5
                                            rounded-[12px]
                                            text-[13.5px]
                                            font-bold
                                        "
                                        style="
                                            border:
                                            none !important;
                                        "
                                    >
                                        Schedule An Appointment
                                    </button>

                                    `
                                );

                            },


                        /* ======================================
                           PAYLOAD
                           ====================================== */

                        getBasePayload:
                            function (
                                source
                            ) {

                                return {

                                    source:
                                        source,

                                    name:
                                        '',

                                    phone:
                                        '',

                                    email:
                                        '',

                                    patient_type:
                                        '',

                                    reason:
                                        '',

                                    best_time:
                                        '',

                                    emergency_symptom:
                                        '',

                                    requested_time:
                                        '',

                                    visitorId:

                                        getChatVisitorId(),

                                    sessionId:

                                        getChatSessionId(),

                                    submissionId:

                                        createTrackingId(
                                            'submission'
                                        ),

                                    pageUrl:

                                        window
                                            .location
                                            .href,

                                    pageTitle:

                                        document
                                            .title
                                        || '',

                                    referrer:

                                        document
                                            .referrer
                                        || '',

                                    userAgent:

                                        navigator
                                            .userAgent
                                        || '',

                                    timestamp:

                                        new Date()
                                            .toISOString()

                                };

                            },


                        submitSchedule:
                            async function (
                                form
                            ) {

                                const data =
                                    new FormData(
                                        form
                                    );


                                const state =
                                    window
                                        .pdaBotState
                                        .schedule;


                                const payload =
                                    this
                                        .getBasePayload(
                                            'Schedule An Appointment'
                                        );


                                payload.patient_type =
                                    state
                                        .patient_type;


                                payload.reason =

                                    state.reason ===
                                        'Other'

                                        ?

                                        `Other: ${state.other_reason}`

                                        :

                                        state.reason;


                                payload.best_time =
                                    state
                                        .best_time;


                                payload.name =
                                    data.get(
                                        'name'
                                    )
                                    || '';


                                payload.phone =
                                    data.get(
                                        'phone'
                                    )
                                    || '';


                                payload.email =
                                    data.get(
                                        'email'
                                    )
                                    || '';


                                if (
                                    payload.name
                                ) {

                                    localStorage
                                        .setItem(
                                            'pdaBotName',
                                            payload.name
                                        );

                                }


                                form
                                    .parentElement
                                    .remove();


                                appendUserMessage(
                                    `${payload.name} • ${payload.phone}`
                                );


                                await this
                                    .processSubmission(
                                        payload,
                                        'Schedule'
                                    );

                            },


                        submitEmergency:
                            async function (
                                form
                            ) {

                                const data =
                                    new FormData(
                                        form
                                    );


                                const state =
                                    window
                                        .pdaBotState
                                        .emergency;


                                const payload =
                                    this
                                        .getBasePayload(
                                            'Dental Emergency'
                                        );


                                payload.emergency_symptom =
                                    state
                                        .symptom;


                                payload.name =
                                    data.get(
                                        'name'
                                    )
                                    || '';


                                payload.phone =
                                    data.get(
                                        'phone'
                                    )
                                    || '';


                                if (
                                    payload.name
                                ) {

                                    localStorage
                                        .setItem(
                                            'pdaBotName',
                                            payload.name
                                        );

                                }


                                form
                                    .parentElement
                                    .remove();


                                appendUserMessage(
                                    `${payload.name} • ${payload.phone}`
                                );


                                await this
                                    .processSubmission(
                                        payload,
                                        'Emergency'
                                    );

                            },


                        submitReschedule:
                            async function (
                                form
                            ) {

                                const data =
                                    new FormData(
                                        form
                                    );


                                const payload =
                                    this
                                        .getBasePayload(
                                            'Reschedule Appointment'
                                        );


                                payload.requested_time =
                                    data.get(
                                        'requested_time'
                                    )
                                    || '';


                                payload.name =
                                    data.get(
                                        'name'
                                    )
                                    || '';


                                payload.phone =
                                    data.get(
                                        'phone'
                                    )
                                    || '';


                                if (
                                    payload.name
                                ) {

                                    localStorage
                                        .setItem(
                                            'pdaBotName',
                                            payload.name
                                        );

                                }


                                form
                                    .parentElement
                                    .remove();


                                appendUserMessage(
                                    `${payload.name} • ${payload.phone}`
                                );


                                await this
                                    .processSubmission(
                                        payload,
                                        'Reschedule'
                                    );

                            },


                        /* ======================================
                           SUBMISSION WEBHOOK
                           ====================================== */

                        processSubmission:
                            async function (
                                payload,
                                type
                            ) {

                                stepIndicator.innerText =
                                    'Sending...';


                                navBackBtn
                                    .classList
                                    .add(
                                        'opacity-0',
                                        'pointer-events-none'
                                    );


                                try {

                                    const response =
                                        await fetch(
                                            WEBHOOK_URL,
                                            {

                                                method:
                                                    'POST',

                                                headers: {

                                                    'Content-Type':
                                                        'application/json'

                                                },

                                                body:

                                                    JSON.stringify(
                                                        payload
                                                    )

                                            }
                                        );


                                    if (
                                        !response.ok
                                    ) {

                                        const errorText =
                                            await response
                                                .text();


                                        console.error(

                                            'Submission webhook error:',

                                            response.status,

                                            errorText

                                        );


                                        throw new Error(

                                            'Submission webhook returned '
                                            +
                                            response.status

                                        );
                                    }


                                    stepIndicator.innerText =
                                        'Done';


                                    this
                                        .showConfirmation(
                                            type
                                        );


                                } catch (
                                    error
                                ) {

                                    console.error(

                                        'Submission webhook failed:',

                                        error

                                    );


                                    stepIndicator.innerText =
                                        'Error';


                                    navBackBtn
                                        .classList
                                        .remove(
                                            'opacity-0',
                                            'pointer-events-none'
                                        );


                                    appendBotMessage(
                                        "I'm sorry — we couldn't send your request right now. Please try again or call the office at (718) 218-1060."
                                    );

                                }

                            },


                        showConfirmation:
                            function (
                                type
                            ) {

                                setTimeout(
                                    () => {

                                        let confirmationText =

                                            'We received your request and just sent a text message to the phone number you provided. We will be in touch shortly!';


                                        if (
                                            type ===
                                            'Emergency'
                                        ) {

                                            confirmationText =

                                                'We received your urgent request. We will review it immediately and reach out to get you scheduled as soon as possible.';

                                        }


                                        chatHistory
                                            .insertAdjacentHTML(
                                                'beforeend',

                                                `

                                                <div
                                                    class="
                                                        flex
                                                        gap-2.5
                                                        w-[95%]
                                                        animate-message
                                                        shrink-0
                                                        m-0
                                                    "
                                                >

                                                    ${getBotAvatarHTML()}


                                                    <div
                                                        class="
                                                            bg-white
                                                            border
                                                            border-slate-100
                                                            rounded-2xl
                                                            rounded-tl-sm
                                                            p-5
                                                            shadow-card
                                                            w-full
                                                            m-0
                                                        "
                                                    >

                                                        <div
                                                            class="
                                                                flex
                                                                items-center
                                                                gap-3
                                                                mb-3
                                                                m-0
                                                            "
                                                        >

                                                            <div
                                                                class="
                                                                    bg-[#0f57bc]/20
                                                                    text-[#0f57bc]
                                                                    p-2
                                                                    rounded-full
                                                                    m-0
                                                                "
                                                            >

                                                                <i
                                                                    data-lucide="check"
                                                                    class="
                                                                        w-4
                                                                        h-4
                                                                    "
                                                                ></i>

                                                            </div>


                                                            <h4
                                                                class="
                                                                    font-bold
                                                                    text-premium-900
                                                                    text-[15px]
                                                                    m-0
                                                                "
                                                            >
                                                                Success!
                                                            </h4>

                                                        </div>


                                                        <p
                                                            class="
                                                                text-[13px]
                                                                text-slate-600
                                                                leading-relaxed
                                                                font-medium
                                                                mb-4
                                                                m-0
                                                            "
                                                        >
                                                            ${confirmationText}
                                                        </p>


                                                        <button
                                                            type="button"
                                                            onclick="
                                                                window.appBot
                                                                .goBack()
                                                            "
                                                            class="
                                                                w-full
                                                                bg-slate-100
                                                                text-slate-700
                                                                font-bold
                                                                py-3
                                                                rounded-xl
                                                            "
                                                            style="
                                                                border:
                                                                none !important;
                                                            "
                                                        >
                                                            Back to Main Menu
                                                        </button>

                                                    </div>

                                                </div>

                                                `
                                            );


                                        window.pdaBotState = {

                                            schedule: {

                                                patient_type:
                                                    '',

                                                reason:
                                                    '',

                                                other_reason:
                                                    '',

                                                best_time:
                                                    ''

                                            },


                                            emergency: {

                                                symptom:
                                                    ''

                                            },


                                            reschedule: {

                                                current_time:
                                                    ''

                                            }

                                        };


                                        if (
                                            typeof lucide !==
                                                'undefined'
                                            &&
                                            lucide.createIcons
                                        ) {

                                            lucide.createIcons();
                                        }


                                        setTimeout(
                                            () => {

                                                chatHistory.scrollTo({

                                                    top:
                                                        chatHistory
                                                            .scrollHeight,

                                                    behavior:
                                                        'smooth'

                                                });


                                                window
                                                    .appBot
                                                    .updateScrollArrow();

                                            },
                                            50
                                        );

                                    },
                                    500
                                );

                            }

                    };

                }


                if (
                    document.readyState ===
                    'loading'
                ) {

                    document.addEventListener(
                        'DOMContentLoaded',
                        initArchieWidget
                    );

                } else {

                    initArchieWidget();
                }

            })();


            root.style.removeProperty(
                'visibility'
            );


        } catch (
            error
        ) {

            console.error(
                'Plaza Dental Arts chatbot failed to initialize:',
                error
            );


            const root =
                document
                    .getElementById(
                        PDA_ROOT_ID
                    );


            if (
                root
            ) {

                root.style.removeProperty(
                    'visibility'
                );
            }

        }

    }


    if (
        document.readyState ===
        'loading'
    ) {

        document.addEventListener(
            'DOMContentLoaded',
            boot,
            {
                once:
                    true
            }
        );

    } else {

        boot();
    }

})();
