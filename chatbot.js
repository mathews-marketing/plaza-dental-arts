/*
 * Plaza Dental Arts — Zoey Website Chatbot
 * Single-file installation:
 *
 * <script src="YOUR-PUBLIC-URL/chatbot.js" defer></script>
 *
 * This file injects the chatbot directly into the page (NO iframe).
 * The widget uses a unique root, unique IDs/classes, scoped Tailwind,
 * and high-specificity CSS overrides to protect it from the host website.
 */

(function () {
    'use strict';

    const PDA_ROOT_ID = 'pda-chatbot-widget';
    const PDA_STYLE_ID = 'pda-chatbot-protected-styles';
    const PDA_FONT_ID = 'pda-chatbot-font';
    const PDA_TAILWIND_ID = 'pda-chatbot-tailwind';
    const PDA_LUCIDE_ID = 'pda-chatbot-lucide';

    /* CHANGE THIS TO PLAZA DENTAL ARTS' REAL OFFICE NUMBER */
    const PDA_OFFICE_PHONE = '+1234567890';

    if (document.getElementById(PDA_ROOT_ID)) {
        return;
    }

    function addFont() {
        if (document.getElementById(PDA_FONT_ID)) return;

        const link = document.createElement('link');
        link.id = PDA_FONT_ID;
        link.rel = 'stylesheet';
        link.href =
            'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap';

        document.head.appendChild(link);
    }

    function loadScript(id, src) {
        return new Promise((resolve, reject) => {
            const existing = document.getElementById(id);

            if (existing) {
                if (existing.dataset.loaded === 'true') {
                    resolve();
                } else {
                    existing.addEventListener('load', resolve, {
                        once: true
                    });

                    existing.addEventListener('error', reject, {
                        once: true
                    });
                }

                return;
            }

            const script = document.createElement('script');

            script.id = id;
            script.src = src;
            script.async = true;

            script.addEventListener(
                'load',
                () => {
                    script.dataset.loaded = 'true';
                    resolve();
                },
                {
                    once: true
                }
            );

            script.addEventListener(
                'error',
                () => {
                    reject(
                        new Error(
                            'Unable to load ' + src
                        )
                    );
                },
                {
                    once: true
                }
            );

            document.head.appendChild(script);
        });
    }

    function installProtectedStyles() {
        if (
            document.getElementById(
                PDA_STYLE_ID
            )
        ) {
            return;
        }

        const style =
            document.createElement('style');

        style.id = PDA_STYLE_ID;

        style.textContent = String.raw`

/* ==========================================================
   PLAZA DENTAL ARTS — ZOEY CHATBOT
   ========================================================== */


/* ==========================================================
   ROOT
   ========================================================== */

#pda-chatbot-widget {
    position: fixed !important;

    right: 16px !important;
    bottom: 16px !important;

    z-index: 2147483647 !important;

    display: flex !important;
    flex-direction: column !important;
    align-items: flex-end !important;

    font-family:
        "Plus Jakarta Sans",
        Arial,
        sans-serif !important;

    font-size: 16px !important;
    line-height: normal !important;

    color: #304454 !important;

    text-align: left !important;

    -webkit-font-smoothing:
        antialiased !important;

    -moz-osx-font-smoothing:
        grayscale !important;
}


@media (min-width: 640px) {

    #pda-chatbot-widget {
        right: 24px !important;
        bottom: 24px !important;
    }

}


/* ==========================================================
   GLOBAL CHATBOT PROTECTION
   ========================================================== */

#pda-chatbot-widget,
#pda-chatbot-widget *,
#pda-chatbot-widget *::before,
#pda-chatbot-widget *::after {
    box-sizing: border-box !important;
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

    text-transform: none !important;

    letter-spacing: normal !important;
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

    cursor:
        pointer !important;

    outline:
        none !important;
}


#pda-chatbot-widget input,
#pda-chatbot-widget textarea,
#pda-chatbot-widget select {

    -webkit-appearance:
        none !important;

    appearance:
        none !important;

    outline:
        none !important;
}


#pda-chatbot-widget a {
    text-decoration: none !important;
}


#pda-chatbot-widget h1,
#pda-chatbot-widget h2,
#pda-chatbot-widget h3,
#pda-chatbot-widget h4,
#pda-chatbot-widget h5,
#pda-chatbot-widget h6,
#pda-chatbot-widget p {

    font-family:
        "Plus Jakarta Sans",
        Arial,
        sans-serif !important;
}


/* ==========================================================
   MAIN PANEL
   ========================================================== */

#pda-chatbot-widget
#pda-widget-panel {

    background-color:
        #ffffff !important;

    color:
        #304454 !important;

    overflow:
        hidden !important;
}


@media (max-width: 639px) {

    #pda-chatbot-widget
    #pda-widget-panel {

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


@media (min-width: 640px) {

    #pda-chatbot-widget
    #pda-widget-panel {

        position:
            relative !important;

        inset:
            auto !important;

        width:
            360px !important;

        height:
            620px !important;

        border:
            1px solid #e2e8f0 !important;

        border-radius:
            24px !important;

        box-shadow:
            0 30px 60px -15px rgba(0,0,0,.4),
            0 10px 30px -5px rgba(0,0,0,.2)
            !important;
    }

}


#pda-chatbot-widget
#pda-bento-view,

#pda-chatbot-widget
#pda-chat-view {

    background-color:
        #ffffff !important;
}


#pda-chatbot-widget
#pda-chat-history,

#pda-chatbot-widget
#pda-chat-nav {

    background-color:
        #fafafa !important;
}


/* ==========================================================
   ANIMATIONS
   ========================================================== */

@keyframes pdaSmoothSpringUp {

    0% {
        opacity: 0;

        transform:
            translateY(20px)
            scale(.98);
    }

    100% {
        opacity: 1;

        transform:
            translateY(0)
            scale(1);
    }

}


@keyframes pdaSmoothSpringDown {

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
            scale(.98);

        visibility:
            hidden;
    }

}


@keyframes pdaSlideInUp {

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


@keyframes pdaPulseDot {

    0% {
        box-shadow:
            0 0 0 0
            rgba(
                15,
                87,
                188,
                .6
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


@keyframes pdaBounceAttention {

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


@keyframes pdaGentleBounce {

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


@keyframes pdaTypingBounce {

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


/* ==========================================================
   TYPING DOTS
   ========================================================== */

#pda-chatbot-widget
.pda-typing-dots {

    display:
        flex !important;

    gap:
        4px !important;

    padding:
        6px 4px !important;
}


#pda-chatbot-widget
.pda-typing-dots span {

    width:
        6px !important;

    height:
        6px !important;

    background-color:
        #94a3b8 !important;

    border-radius:
        50% !important;

    animation:
        pdaTypingBounce
        1.4s
        infinite
        ease-in-out
        both !important;
}


#pda-chatbot-widget
.pda-typing-dots
span:nth-child(1) {

    animation-delay:
        -.32s !important;
}


#pda-chatbot-widget
.pda-typing-dots
span:nth-child(2) {

    animation-delay:
        -.16s !important;
}


/* ==========================================================
   WIDGET ANIMATIONS
   ========================================================== */

#pda-chatbot-widget
.pda-widget-hidden {

    pointer-events:
        none !important;

    animation:
        pdaSmoothSpringDown
        .25s
        cubic-bezier(
            .4,
            0,
            1,
            1
        )
        forwards !important;
}


#pda-chatbot-widget
.pda-widget-visible {

    pointer-events:
        auto !important;

    animation:
        pdaSmoothSpringUp
        .5s
        cubic-bezier(
            .16,
            1,
            .3,
            1
        )
        forwards !important;
}


#pda-chatbot-widget
.pda-animate-message {

    animation:
        pdaSlideInUp
        .35s
        cubic-bezier(
            .16,
            1,
            .3,
            1
        )
        forwards !important;
}


#pda-chatbot-widget
.pda-status-dot {

    animation:
        pdaPulseDot
        2s
        infinite !important;
}


#pda-chatbot-widget
.pda-animate-attention {

    animation:
        pdaBounceAttention
        .4s
        ease-in-out
        2 !important;
}


#pda-chatbot-widget
.pda-animate-gentle-bounce {

    animation:
        pdaGentleBounce
        1.5s
        ease-in-out
        infinite !important;
}


/* ==========================================================
   SCROLLBARS
   ========================================================== */

#pda-chatbot-widget
.pda-custom-scrollbar::-webkit-scrollbar {

    width:
        5px !important;

    height:
        5px !important;
}


#pda-chatbot-widget
.pda-custom-scrollbar::-webkit-scrollbar-track {

    background:
        transparent !important;
}


#pda-chatbot-widget
.pda-custom-scrollbar::-webkit-scrollbar-thumb {

    background:
        #e2e8f0 !important;

    border-radius:
        10px !important;
}


#pda-chatbot-widget
.pda-custom-scrollbar::-webkit-scrollbar-thumb:hover {

    background:
        #cbd5e1 !important;
}


#pda-chatbot-widget
.pda-hide-scrollbar::-webkit-scrollbar {

    display:
        none !important;
}


#pda-chatbot-widget
.pda-hide-scrollbar {

    -ms-overflow-style:
        none !important;

    scrollbar-width:
        none !important;
}


/* ==========================================================
   HEADER CLOSE BUTTONS
   ========================================================== */

#pda-chatbot-widget
.pda-header-close {

    width:
        auto !important;

    height:
        auto !important;

    margin:
        0 !important;

    padding:
        8px !important;

    border:
        0 !important;

    border-radius:
        9999px !important;

    background:
        transparent !important;

    background-color:
        transparent !important;

    background-image:
        none !important;

    color:
        rgba(
            255,
            255,
            255,
            .70
        ) !important;

    box-shadow:
        none !important;

    line-height:
        1 !important;
}


#pda-chatbot-widget
.pda-header-close-compact {

    padding:
        6px !important;

    border-radius:
        8px !important;
}


#pda-chatbot-widget
.pda-header-close:hover {

    background-color:
        rgba(
            255,
            255,
            255,
            .10
        ) !important;

    color:
        #ffffff !important;
}


/* ==========================================================
   MAIN SCHEDULE BUTTON
   ========================================================== */

#pda-chatbot-widget
.pda-main-schedule-btn {

    display:
        flex !important;

    align-items:
        center !important;

    justify-content:
        space-between !important;

    width:
        100% !important;

    height:
        auto !important;

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

    background-color:
        #0f57bc !important;

    background-image:
        none !important;

    color:
        #ffffff !important;

    text-align:
        left !important;

    box-shadow:
        none !important;
}


#pda-chatbot-widget
.pda-main-schedule-btn:hover {

    background:
        #0d4a9f !important;

    background-color:
        #0d4a9f !important;

    color:
        #ffffff !important;
}


/* ==========================================================
   EMERGENCY BUTTON
   ========================================================== */

#pda-chatbot-widget
.pda-main-emergency-btn {

    display:
        flex !important;

    align-items:
        center !important;

    justify-content:
        space-between !important;

    width:
        100% !important;

    height:
        auto !important;

    margin:
        4px 0 0 !important;

    padding:
        14px !important;

    border:
        1px solid
        #ffdede !important;

    border-radius:
        14px !important;

    background:
        #fff4f4 !important;

    background-color:
        #fff4f4 !important;

    background-image:
        none !important;

    color:
        #d92d20 !important;

    text-align:
        left !important;

    box-shadow:
        none !important;
}


#pda-chatbot-widget
.pda-main-emergency-btn:hover {

    background:
        #ffeaea !important;

    background-color:
        #ffeaea !important;
}


/* ==========================================================
   GRID BUTTONS
   ========================================================== */

#pda-chatbot-widget
.pda-grid-btn {

    display:
        flex !important;

    align-items:
        center !important;

    gap:
        8px !important;

    width:
        100% !important;

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

    background-color:
        #ffffff !important;

    background-image:
        none !important;

    color:
        #334155 !important;

    text-align:
        left !important;

    box-shadow:
        0 1px 2px
        rgba(
            0,
            0,
            0,
            .05
        ) !important;
}


#pda-chatbot-widget
.pda-grid-btn:hover {

    background:
        #f8fafc !important;

    background-color:
        #f8fafc !important;

    border-color:
        rgba(
            15,
            87,
            188,
            .30
        ) !important;
}


/* ==========================================================
   BACK BUTTON
   ========================================================== */

#pda-chatbot-widget
.pda-back-btn {

    display:
        flex !important;

    align-items:
        center !important;

    gap:
        6px !important;

    width:
        auto !important;

    height:
        auto !important;

    min-width:
        0 !important;

    min-height:
        0 !important;

    margin:
        0 !important;

    padding:
        0 !important;

    border:
        0 !important;

    border-radius:
        0 !important;

    background:
        transparent !important;

    background-color:
        transparent !important;

    background-image:
        none !important;

    color:
        #64748b !important;

    box-shadow:
        none !important;

    font-size:
        13px !important;

    font-weight:
        700 !important;

    line-height:
        20px !important;
}


#pda-chatbot-widget
.pda-back-btn svg {

    width:
        16px !important;

    height:
        16px !important;

    color:
        #64748b !important;

    stroke:
        #64748b !important;
}


#pda-chatbot-widget
.pda-back-btn:hover {

    background:
        transparent !important;

    background-color:
        transparent !important;

    color:
        #0f57bc !important;
}


#pda-chatbot-widget
.pda-back-btn:hover svg {

    color:
        #0f57bc !important;

    stroke:
        #0f57bc !important;
}


/* ==========================================================
   OPTION BUTTONS
   ========================================================== */

#pda-chatbot-widget
.pda-option-btn {

    display:
        inline-flex !important;

    align-items:
        center !important;

    justify-content:
        center !important;

    width:
        auto !important;

    max-width:
        100% !important;

    height:
        auto !important;

    min-width:
        0 !important;

    min-height:
        0 !important;

    margin:
        0 !important;

    padding:
        6px 16px !important;

    border-radius:
        9999px !important;

    background:
        #ffffff !important;

    background-color:
        #ffffff !important;

    background-image:
        none !important;

    box-shadow:
        0 1px 2px
        rgba(
            0,
            0,
            0,
            .05
        ) !important;

    font-size:
        13px !important;

    font-weight:
        500 !important;

    line-height:
        20px !important;

    white-space:
        normal !important;

    text-align:
        center !important;
}


#pda-chatbot-widget
.pda-option-blue {

    border:
        1px solid
        rgba(
            15,
            87,
            188,
            .30
        ) !important;

    color:
        #0f57bc !important;
}


#pda-chatbot-widget
.pda-option-blue:hover {

    background:
        #f8fafc !important;

    color:
        #0f57bc !important;
}


#pda-chatbot-widget
.pda-option-red {

    border:
        1px solid
        #fecaca !important;

    color:
        #b91c1c !important;
}


#pda-chatbot-widget
.pda-option-red:hover {

    background:
        #fef2f2 !important;

    color:
        #b91c1c !important;
}


/* ==========================================================
   STANDARD INPUTS
   ========================================================== */

#pda-chatbot-widget
.pda-chat-input-field {

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

    min-height:
        0 !important;

    margin:
        0 0 12px !important;

    padding:
        12px 16px !important;

    border:
        1px solid
        #e2e8f0 !important;

    border-radius:
        10px !important;

    background:
        #f8fafc !important;

    background-color:
        #f8fafc !important;

    background-image:
        none !important;

    color:
        #304454 !important;

    box-shadow:
        none !important;

    font-size:
        14px !important;

    font-weight:
        400 !important;

    line-height:
        20px !important;

    transition:
        all .2s ease !important;
}


#pda-chatbot-widget
textarea.pda-chat-input-field {

    height:
        80px !important;

    resize:
        none !important;
}


#pda-chatbot-widget
.pda-chat-input-field::placeholder {

    color:
        #94a3b8 !important;

    opacity:
        1 !important;
}


#pda-chatbot-widget
.pda-chat-input-field:focus {

    background:
        #ffffff !important;

    background-color:
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
        ) !important;
}


#pda-chatbot-widget
input[type="email"]
.pda-chat-input-field {

    margin-bottom:
        8px !important;
}


/* ==========================================================
   INLINE INPUT
   ========================================================== */

#pda-chatbot-widget
.pda-inline-input {

    display:
        block !important;

    width:
        100% !important;

    height:
        42px !important;

    margin:
        0 !important;

    padding:
        10px 48px 10px 16px !important;

    border:
        1px solid
        rgba(
            15,
            87,
            188,
            .30
        ) !important;

    border-radius:
        9999px !important;

    background:
        #ffffff !important;

    background-color:
        #ffffff !important;

    color:
        #334155 !important;

    box-shadow:
        0 1px 2px
        rgba(
            0,
            0,
            0,
            .05
        ) !important;

    font-size:
        13.5px !important;

    line-height:
        20px !important;
}


#pda-chatbot-widget
.pda-inline-input:focus {

    border-color:
        #0f57bc !important;

    box-shadow:
        0 0 0 2px
        rgba(
            15,
            87,
            188,
            .10
        ) !important;
}


/* ==========================================================
   LIVE CHAT INPUT
   ========================================================== */

#pda-chatbot-widget
.pda-live-input {

    display:
        block !important;

    width:
        100% !important;

    height:
        44px !important;

    margin:
        0 !important;

    padding:
        12px 48px 12px 16px !important;

    border:
        1px solid
        #e2e8f0 !important;

    border-radius:
        9999px !important;

    background:
        #f8fafc !important;

    background-color:
        #f8fafc !important;

    background-image:
        none !important;

    color:
        #334155 !important;

    box-shadow:
        none !important;

    font-size:
        14px !important;

    line-height:
        20px !important;
}


#pda-chatbot-widget
.pda-live-input::placeholder {

    color:
        #94a3b8 !important;

    opacity:
        1 !important;
}


#pda-chatbot-widget
.pda-live-input:focus {

    border-color:
        rgba(
            15,
            87,
            188,
            .50
        ) !important;

    box-shadow:
        0 0 0 2px
        rgba(
            15,
            87,
            188,
            .10
        ) !important;
}


/* ==========================================================
   FORM SUBMIT BUTTONS
   ========================================================== */

#pda-chatbot-widget
.pda-form-submit-btn {

    display:
        block !important;

    width:
        100% !important;

    height:
        auto !important;

    margin:
        0 !important;

    padding:
        14px 16px !important;

    border:
        0 !important;

    border-radius:
        12px !important;

    background-image:
        none !important;

    color:
        #ffffff !important;

    box-shadow:
        none !important;

    font-size:
        14px !important;

    font-weight:
        700 !important;

    line-height:
        20px !important;

    text-align:
        center !important;
}


#pda-chatbot-widget
.pda-form-submit-blue {

    background:
        #0f57bc !important;

    background-color:
        #0f57bc !important;
}


#pda-chatbot-widget
.pda-form-submit-blue:hover {

    background:
        #0d4a9f !important;

    background-color:
        #0d4a9f !important;
}


#pda-chatbot-widget
#pda-reschedule-form
.pda-form-submit-blue {

    margin-top:
        8px !important;
}


#pda-chatbot-widget
.pda-form-submit-red {

    margin-top:
        8px !important;

    background:
        #dc2626 !important;

    background-color:
        #dc2626 !important;
}


#pda-chatbot-widget
.pda-form-submit-red:hover {

    background:
        #b91c1c !important;

    background-color:
        #b91c1c !important;
}


/* ==========================================================
   INLINE SUBMIT
   ========================================================== */

#pda-chatbot-widget
.pda-inline-submit-btn {

    position:
        absolute !important;

    right:
        4px !important;

    top:
        4px !important;

    bottom:
        4px !important;

    width:
        34px !important;

    min-width:
        34px !important;

    height:
        34px !important;

    padding:
        8px !important;

    margin:
        0 !important;

    border:
        0 !important;

    border-radius:
        9999px !important;

    background:
        #0f57bc !important;

    background-color:
        #0f57bc !important;

    color:
        #ffffff !important;

    box-shadow:
        0 1px 2px
        rgba(
            0,
            0,
            0,
            .05
        ) !important;
}


#pda-chatbot-widget
.pda-inline-submit-btn:hover {

    background:
        #0d4a9f !important;

    background-color:
        #0d4a9f !important;
}


/* ==========================================================
   CHAT SEND BUTTON
   ========================================================== */

#pda-chatbot-widget
.pda-chat-submit-btn {

    position:
        absolute !important;

    right:
        6px !important;

    width:
        32px !important;

    min-width:
        32px !important;

    height:
        32px !important;

    min-height:
        32px !important;

    padding:
        8px !important;

    margin:
        0 !important;

    border:
        0 !important;

    border-radius:
        9999px !important;

    background:
        #0f57bc !important;

    background-color:
        #0f57bc !important;

    color:
        #ffffff !important;

    box-shadow:
        0 1px 2px
        rgba(
            0,
            0,
            0,
            .05
        ) !important;
}


#pda-chatbot-widget
.pda-chat-submit-btn:hover {

    background:
        #0d4a9f !important;

    background-color:
        #0d4a9f !important;

    color:
        #ffffff !important;
}


/* ==========================================================
   BLUE CTA BUTTONS
   ========================================================== */

#pda-chatbot-widget
.pda-chat-schedule-btn,

#pda-chatbot-widget
.pda-review-cta,

#pda-chatbot-widget
.pda-call-cta {

    display:
        flex !important;

    align-items:
        center !important;

    justify-content:
        center !important;

    gap:
        8px !important;

    width:
        100% !important;

    height:
        auto !important;

    margin:
        0 !important;

    padding:
        12px 16px !important;

    border:
        0 !important;

    border-radius:
        12px !important;

    background:
        #0f57bc !important;

    background-color:
        #0f57bc !important;

    background-image:
        none !important;

    color:
        #ffffff !important;

    box-shadow:
        0 1px 2px
        rgba(
            0,
            0,
            0,
            .05
        ) !important;

    font-size:
        13.5px !important;

    font-weight:
        700 !important;

    line-height:
        20px !important;

    text-align:
        center !important;
}


#pda-chatbot-widget
.pda-chat-schedule-btn:hover,

#pda-chatbot-widget
.pda-review-cta:hover,

#pda-chatbot-widget
.pda-call-cta:hover {

    background:
        #0d4a9f !important;

    background-color:
        #0d4a9f !important;
}


#pda-chatbot-widget
.pda-review-cta,

#pda-chatbot-widget
.pda-call-cta {

    padding:
        14px 16px !important;

    margin-bottom:
        10px !important;
}


/* ==========================================================
   SUCCESS BACK BUTTON
   ========================================================== */

#pda-chatbot-widget
.pda-success-back-btn {

    display:
        block !important;

    width:
        100% !important;

    height:
        auto !important;

    margin:
        0 !important;

    padding:
        12px 16px !important;

    border:
        0 !important;

    border-radius:
        12px !important;

    background:
        #f1f5f9 !important;

    background-color:
        #f1f5f9 !important;

    color:
        #334155 !important;

    box-shadow:
        none !important;

    font-size:
        13px !important;

    font-weight:
        700 !important;

    line-height:
        20px !important;
}


#pda-chatbot-widget
.pda-success-back-btn:hover {

    background:
        #e2e8f0 !important;

    background-color:
        #e2e8f0 !important;
}


/* ==========================================================
   SCROLL BUTTON
   ========================================================== */

#pda-chatbot-widget
.pda-scroll-btn {

    width:
        32px !important;

    min-width:
        32px !important;

    height:
        32px !important;

    min-height:
        32px !important;

    padding:
        0 !important;

    margin:
        0 !important;

    border:
        0 !important;

    border-radius:
        9999px !important;

    background:
        #0f57bc !important;

    background-color:
        #0f57bc !important;

    color:
        #ffffff !important;
}


/* ==========================================================
   TRIGGER BUTTON
   ========================================================== */

#pda-chatbot-widget
.pda-trigger-btn {

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

    background-color:
        transparent !important;

    background-image:
        none !important;

    box-shadow:
        0 15px 35px -5px
        rgba(
            15,
            87,
            188,
            .25
        ) !important;
}


/* ==========================================================
   FORM CARDS
   ========================================================== */

#pda-chatbot-widget
#pda-schedule-form-4 form,

#pda-chatbot-widget
#pda-reschedule-form form {

    width:
        100% !important;

    margin:
        0 !important;

    padding:
        16px !important;

    border:
        1px solid
        #f1f5f9 !important;

    border-radius:
        16px !important;

    background:
        #ffffff !important;

    background-color:
        #ffffff !important;
}


#pda-chatbot-widget
#pda-emergency-form-2 form {

    width:
        100% !important;

    margin:
        0 !important;

    padding:
        16px !important;

    border:
        1px solid
        #fee2e2 !important;

    border-radius:
        16px !important;

    background:
        #fef2f2 !important;

    background-color:
        #fef2f2 !important;
}


/* ==========================================================
   CHIP PROTECTION
   ========================================================== */

#pda-chatbot-widget
.pda-chip-input:checked
+
.pda-chip-label {

    background-color:
        #0f57bc !important;

    color:
        #ffffff !important;

    border-color:
        #0f57bc !important;
}

        `;

        document.head.appendChild(
            style
        );
    }


    function createWidgetMarkup() {

        const root =
            document.createElement(
                'div'
            );

        root.id =
            PDA_ROOT_ID;

        root.className =
            'pda-chatbot-root';

        root.style.setProperty(
            'visibility',
            'hidden',
            'important'
        );


        root.innerHTML = String.raw`

<!-- ========================================================
     CHATBOT PANEL
     ======================================================== -->

<div
    id="pda-widget-panel"
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
    style="display:none;"
>


    <!-- ====================================================
         VIEW 1 — MAIN MENU
         ==================================================== -->

    <div
        id="pda-bento-view"
        class="
            absolute
            inset-0
            flex
            flex-col
            w-full
            h-full
            transition-all
            duration-300
            ease-[cubic-bezier(0.25,1,0.5,1)]
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

                    <div
                        class="
                            w-14
                            h-14
                            rounded-full
                            overflow-hidden
                            border-2
                            border-white
                            shadow-md
                            bg-white
                        "
                        style="
                            background-color:
                            white !important;
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
                            pda-status-dot
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
                onclick="window.pdaToggleWidget()"
                class="
                    pda-header-close
                    text-white/70
                    hover:text-white
                    transition-colors
                    hover:bg-white/10
                    rounded-full
                    p-2
                    shrink-0
                    active:scale-95
                    border-none
                    outline-none
                    focus:outline-none
                    ring-0
                    bg-transparent
                    m-0
                    cursor-pointer
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
                pda-custom-scrollbar
            "
        >


            <!-- WELCOME -->

            <div
                id="pda-welcome-bubble"
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
                I'm here to help you get
                scheduled, answer questions,
                or connect you with our team.
                How can I assist you today?
            </div>


            <!-- SCHEDULE -->

            <button
                type="button"
                onclick="
                    window.pdaAppBot
                    .startFlow('schedule')
                "
                class="
                    pda-main-schedule-btn
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
                            transition-colors
                            duration-300
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
                                mb-0
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
                        group-hover:bg-white/30
                        transition-colors
                    "
                >

                    <i
                        data-lucide="chevron-right"
                        class="
                            w-3.5
                            h-3.5
                            text-white
                            ml-0.5
                        "
                    ></i>

                </div>

            </button>


            <!-- EMERGENCY -->

            <button
                type="button"
                onclick="
                    window.pdaAppBot
                    .startFlow('emergency')
                "
                class="
                    pda-main-emergency-btn
                    w-full
                    bg-[#fff4f4]
                    text-[#d92d20]
                    py-[14px]
                    px-3.5
                    rounded-[14px]
                    flex
                    items-center
                    justify-between
                    hover:bg-[#ffeaea]
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
                            transition-colors
                            flex
                            items-center
                            justify-center
                            shadow-sm
                            border
                            border-red-100/50
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
                                mb-0
                                tracking-tight
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
                                tracking-wide
                                leading-none
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
                        shrink-0
                        opacity-80
                        group-hover:opacity-100
                        transition-opacity
                    "
                ></div>

            </button>


            <!-- GRID -->

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
                        window.pdaAppBot
                        .startFlow('reschedule')
                    "
                    class="
                        pda-grid-btn
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
                        hover:shadow-md
                        hover:bg-slate-50
                        transition-all
                        duration-200
                        group
                        active:scale-95
                        m-0
                        cursor-pointer
                        text-left
                    "
                >

                    <i
                        data-lucide="calendar-clock"
                        class="
                            w-[16px]
                            h-[16px]
                            text-slate-400
                            group-hover:text-[#0f57bc]
                            transition-colors
                            shrink-0
                        "
                    ></i>

                    <span
                        class="
                            text-[11.5px]
                            font-semibold
                            text-slate-700
                            group-hover:text-[#0f57bc]
                            transition-colors
                            leading-tight
                            tracking-tight
                            block
                        "
                    >
                        Reschedule
                    </span>

                </button>


                <button
                    type="button"
                    onclick="
                        window.pdaAppBot
                        .startFlow('question')
                    "
                    class="
                        pda-grid-btn
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
                        hover:shadow-md
                        hover:bg-slate-50
                        transition-all
                        duration-200
                        group
                        active:scale-95
                        m-0
                        cursor-pointer
                        text-left
                    "
                >

                    <i
                        data-lucide="message-circle"
                        class="
                            w-[16px]
                            h-[16px]
                            text-slate-400
                            group-hover:text-[#0f57bc]
                            transition-colors
                            shrink-0
                        "
                    ></i>

                    <span
                        class="
                            text-[11.5px]
                            font-semibold
                            text-slate-700
                            group-hover:text-[#0f57bc]
                            transition-colors
                            leading-tight
                            tracking-tight
                            block
                        "
                    >
                        Ask Question
                    </span>

                </button>


                <button
                    type="button"
                    onclick="
                        window.pdaAppBot
                        .startFlow('call')
                    "
                    class="
                        pda-grid-btn
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
                        hover:shadow-md
                        hover:bg-slate-50
                        transition-all
                        duration-200
                        group
                        active:scale-95
                        m-0
                        cursor-pointer
                        text-left
                    "
                >

                    <i
                        data-lucide="phone"
                        class="
                            w-[16px]
                            h-[16px]
                            text-slate-400
                            group-hover:text-[#0f57bc]
                            transition-colors
                            shrink-0
                        "
                    ></i>

                    <span
                        class="
                            text-[11.5px]
                            font-semibold
                            text-slate-700
                            group-hover:text-[#0f57bc]
                            transition-colors
                            leading-tight
                            tracking-tight
                            block
                        "
                    >
                        Call Us
                    </span>

                </button>


                <button
                    type="button"
                    onclick="
                        window.pdaAppBot
                        .startFlow('reviews')
                    "
                    class="
                        pda-grid-btn
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
                        hover:shadow-md
                        hover:bg-slate-50
                        transition-all
                        duration-200
                        group
                        active:scale-95
                        m-0
                        cursor-pointer
                        text-left
                    "
                >

                    <i
                        data-lucide="star"
                        class="
                            w-[16px]
                            h-[16px]
                            text-slate-400
                            group-hover:text-[#0f57bc]
                            transition-colors
                            shrink-0
                        "
                    ></i>

                    <span
                        class="
                            text-[11.5px]
                            font-semibold
                            text-slate-700
                            group-hover:text-[#0f57bc]
                            transition-colors
                            leading-tight
                            tracking-tight
                            block
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


    <!-- ====================================================
         VIEW 2 — CHAT
         ==================================================== -->

    <div
        id="pda-chat-view"
        class="
            absolute
            inset-0
            flex
            flex-col
            w-full
            h-full
            transition-all
            duration-300
            ease-[cubic-bezier(0.25,1,0.5,1)]
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
                            w-14
                            h-14
                            rounded-full
                            overflow-hidden
                            border-2
                            border-white
                            shadow-md
                            bg-white
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
                            pda-status-dot
                        "
                    ></span>

                </div>


                <div>

                    <h4
                        id="pda-chat-header-title"
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
                    window.pdaToggleWidget()
                "
                class="
                    pda-header-close
                    pda-header-close-compact
                    text-white/70
                    hover:text-white
                    transition-colors
                    p-1.5
                    rounded-lg
                    hover:bg-white/10
                    active:scale-90
                    relative
                    z-10
                    border-none
                    outline-none
                    focus:outline-none
                    ring-0
                    bg-transparent
                    m-0
                    cursor-pointer
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


        <!-- NAV -->

        <div
            id="pda-chat-nav"
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
                id="pda-nav-back-btn"
                type="button"
                onclick="
                    window.pdaAppBot
                    .goBack()
                "
                class="
                    pda-back-btn
                    flex
                    items-center
                    gap-1.5
                    text-[13px]
                    font-bold
                    text-slate-500
                    hover:text-accent-500
                    transition-colors
                    active:scale-95
                    border-none
                    outline-none
                    focus:outline-none
                    ring-0
                    m-0
                    cursor-pointer
                "
                style="
                    border:
                    none !important;

                    background:
                    transparent !important;
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
                id="pda-step-indicator"
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


        <!-- CHAT HISTORY -->

        <div
            id="pda-chat-history"
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
                pda-custom-scrollbar
                pb-6
                relative
                m-0
            "
        ></div>


        <!-- SCROLL DOWN -->

        <button
            id="pda-scroll-down-btn"
            type="button"
            onclick="
                document
                .getElementById(
                    'pda-chat-history'
                )
                .scrollTo({
                    top:
                    document
                    .getElementById(
                        'pda-chat-history'
                    )
                    .scrollHeight,

                    behavior:
                    'smooth'
                })
            "
            class="
                pda-scroll-btn
                absolute
                bottom-[90px]
                left-2
                bg-accent-500
                text-white
                rounded-full
                w-8
                h-8
                shadow-md
                hover:bg-accent-600
                transition-all
                z-20
                pda-animate-gentle-bounce
                flex
                items-center
                justify-center
                active:scale-95
                cursor-pointer
                hover:shadow-lg
                m-0
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


        <!-- CHAT INPUT AREA -->

        <div
            id="pda-chat-input-area"
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
                    window.pdaAppBot
                    .startFlow(
                        'schedule'
                    )
                "
                class="
                    pda-chat-schedule-btn
                    w-full
                    bg-[#0f57bc]
                    text-white
                    py-2.5
                    rounded-xl
                    text-[13px]
                    font-bold
                    transition-all
                    shadow-sm
                    active:scale-95
                    flex
                    items-center
                    justify-center
                    gap-2
                    m-0
                    cursor-pointer
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

                    window.pdaAppBot
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
                    id="pda-live-chat-input"
                    placeholder="Type your message..."
                    autocomplete="off"
                    class="
                        pda-live-input
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
                    "
                >


                <button
                    id="pda-live-chat-submit"
                    type="submit"
                    class="
                        pda-chat-submit-btn
                        absolute
                        right-1.5
                        p-2
                        bg-accent-500
                        text-white
                        rounded-full
                        shadow-sm
                        flex
                        items-center
                        justify-center
                        m-0
                        cursor-pointer
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
                            ml-0.5
                            mt-0.5
                        "
                    ></i>

                </button>

            </form>

        </div>


        <!-- HIPAA FOOTER -->

        <div
            id="pda-hipaa-footer"
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


<!-- ========================================================
     FLOATING TRIGGER
     ======================================================== -->

<div
    class="
        flex
        items-end
        gap-3
        z-50
    "
>

    <div
        id="pda-trigger-bubble"
        onclick="
            window.pdaToggleWidget()
        "
        style="
            display:
            none;
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
    >

        <span
            id="pda-trigger-text"
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
        id="pda-trigger-btn"
        type="button"
        onclick="
            window.pdaToggleWidget()
        "
        class="
            pda-trigger-btn
            transition-all
            duration-300
            m-0
            p-0
        "
        style="
            width:
            54px;

            height:
            54px;

            border-radius:
            50%;

            border:
            none !important;

            background:
            transparent !important;

            position:
            relative;

            cursor:
            pointer;

            flex-shrink:
            0;

            box-shadow:
            0 15px 35px -5px
            rgba(
                15,
                87,
                188,
                .25
            );
        "
    >


        <div
            id="pda-icon-default"
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
            id="pda-icon-active"
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

                border:
                2px solid #0f57bc;
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
            id="pda-trigger-dot"
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
                pda-status-dot
                z-10
            "
        ></span>


        <span
            id="pda-notification-badge"
            style="
                display:
                none;
            "
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
        >
            1
        </span>

    </button>

</div>

        `;


        document.body.appendChild(
            root
        );

        return root;
    }


    async function bootPDAChatbot() {

        if (!document.body) {

            requestAnimationFrame(
                bootPDAChatbot
            );

            return;
        }


        addFont();


        const root =
            createWidgetMarkup();


        try {

            await loadScript(
                PDA_TAILWIND_ID,
                'https://cdn.tailwindcss.com'
            );


            if (window.tailwind) {

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


            await loadScript(
                PDA_LUCIDE_ID,
                'https://unpkg.com/lucide@latest'
            );


            installProtectedStyles();


            await new Promise(
                resolve =>
                    requestAnimationFrame(
                        () =>
                            requestAnimationFrame(
                                resolve
                            )
                    )
            );


            root.style.removeProperty(
                'visibility'
            );


            /* ==================================================
               CHATBOT FUNCTIONALITY
               ================================================== */

            (function () {


                /* ==============================================
                   STATE
                   ============================================== */

                window.pdaBotState = {

                    schedule: {
                        patient_type: '',
                        reason: '',
                        other_reason: '',
                        best_time: ''
                    },

                    emergency: {
                        symptom: ''
                    },

                    reschedule: {
                        current_time: ''
                    }

                };


                /* ==============================================
                   WEBHOOKS + ASSETS
                   ============================================== */

                const WEBHOOK_URL =
                    'https://api.mikemathewscmo.com/webhook/pda-website-chatbot';


                const QUESTION_WEBHOOK_URL =
                    'https://api.mikemathewscmo.com/webhook/pda-website-askquestion';


                const NOTIFICATION_SOUND_URL =
                    'https://assets.cdn.filesafe.space/pavIFdgrv0CTos4BgVKm/media/6a01a85abc1f77cc3588852a.mp3';


                const MESSAGE_SOUND_URL =
                    'https://assets.cdn.filesafe.space/pavIFdgrv0CTos4BgVKm/media/6a3ec3a6d50c4ff184ddb813.mp3';


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

                let hasInteracted =
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
                        prefix +
                        '-' +
                        (
                            typeof crypto !==
                                'undefined' &&
                            crypto.randomUUID
                                ?
                                crypto.randomUUID()
                                :
                                Date.now() +
                                '-' +
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
                        localStorage.getItem(
                            'pdaChatVisitorId'
                        );


                    if (!id) {

                        id =
                            createTrackingId(
                                'visitor'
                            );


                        localStorage.setItem(
                            'pdaChatVisitorId',
                            id
                        );

                    }


                    return id;
                }


                function getChatSessionId() {

                    let id =
                        localStorage.getItem(
                            'pdaChatSessionId'
                        );


                    if (!id) {

                        id =
                            createTrackingId(
                                'sid'
                            );


                        localStorage.setItem(
                            'pdaChatSessionId',
                            id
                        );

                    }


                    return id;
                }


                function getSavedFirstName() {

                    const name =
                        localStorage.getItem(
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
                        first.slice(1)
                    );
                }


                /* ==============================================
                   INITIALIZATION
                   ============================================== */

                function initPDAWidget() {


                    if (
                        typeof lucide !==
                            'undefined' &&
                        lucide.createIcons
                    ) {

                        lucide.createIcons();
                    }


                    dingAudio.load();
                    msgAudio.load();


                    const panel =
                        document.getElementById(
                            'pda-widget-panel'
                        );


                    const triggerBubble =
                        document.getElementById(
                            'pda-trigger-bubble'
                        );


                    const bentoView =
                        document.getElementById(
                            'pda-bento-view'
                        );


                    const chatView =
                        document.getElementById(
                            'pda-chat-view'
                        );


                    const chatHistory =
                        document.getElementById(
                            'pda-chat-history'
                        );


                    const triggerText =
                        document.getElementById(
                            'pda-trigger-text'
                        );


                    const iconDefault =
                        document.getElementById(
                            'pda-icon-default'
                        );


                    const iconActive =
                        document.getElementById(
                            'pda-icon-active'
                        );


                    const triggerDot =
                        document.getElementById(
                            'pda-trigger-dot'
                        );


                    const notificationBadge =
                        document.getElementById(
                            'pda-notification-badge'
                        );


                    const chatHeaderTitle =
                        document.getElementById(
                            'pda-chat-header-title'
                        );


                    const stepIndicator =
                        document.getElementById(
                            'pda-step-indicator'
                        );


                    const navBackBtn =
                        document.getElementById(
                            'pda-nav-back-btn'
                        );


                    const savedName =
                        getSavedFirstName();


                    if (savedName) {

                        if (triggerText) {

                            triggerText.innerHTML =
                                `Welcome back, ${savedName}! We're online to help.`;

                        }


                        const welcomeBubble =
                            document.getElementById(
                                'pda-welcome-bubble'
                            );


                        if (welcomeBubble) {

                            welcomeBubble.innerHTML =
                                `Welcome back, ${savedName}! Welcome to Plaza Dental Arts. I'm here to help you get scheduled, answer questions, or connect you with our team.`;

                        }

                    }


                    /* ==========================================
                       SOUNDS
                       ========================================== */

                    function playMessageSound() {

                        const sound =
                            msgAudio.cloneNode();


                        sound.volume =
                            .4;


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


                        const playPromise =
                            dingAudio.play();


                        if (
                            playPromise !==
                            undefined
                        ) {

                            playPromise
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
                            isWidgetOpen ||
                            badgeVisible
                        ) {
                            return;
                        }


                        badgeVisible =
                            true;


                        if (
                            notificationBadge
                        ) {

                            notificationBadge
                                .style
                                .display =
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

                            triggerBubble
                                .style
                                .display =
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
                                            'pda-animate-attention'
                                        );


                                    setTimeout(
                                        () =>
                                            triggerBubble
                                                .classList
                                                .remove(
                                                    'pda-animate-attention'
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


                    /* ==========================================
                       AUDIO UNLOCK
                       ========================================== */

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
                                !hasPlayedSound &&
                                badgeVisible
                            ) {

                                attemptDing();

                            } else {

                                dingAudio
                                    .play()
                                    .then(
                                        () => {

                                            dingAudio.pause();

                                            dingAudio.currentTime =
                                                0;

                                        }
                                    )
                                    .catch(
                                        () => {}
                                    );


                                msgAudio
                                    .play()
                                    .then(
                                        () => {

                                            msgAudio.pause();

                                            msgAudio.currentTime =
                                                0;

                                        }
                                    )
                                    .catch(
                                        () => {}
                                    );

                            }


                            [
                                'click',
                                'keydown',
                                'touchstart',
                                'scroll',
                                'mousemove',
                                'wheel'
                            ].forEach(
                                evt =>
                                    document
                                        .removeEventListener(
                                            evt,
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
                    ].forEach(
                        evt =>
                            document
                                .addEventListener(
                                    evt,
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

                    window.pdaToggleWidget =
                        function () {


                            isWidgetOpen =
                                !isWidgetOpen;


                            hasInteracted =
                                true;


                            if (
                                isWidgetOpen &&
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

                                        panel.classList.remove(
                                            'pda-widget-hidden'
                                        );


                                        panel.classList.add(
                                            'pda-widget-visible'
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
                                        'pda-widget-visible'
                                    );


                                panel
                                    .classList
                                    .add(
                                        'pda-widget-hidden'
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
                                                'pda-hipaa-footer'
                                            )
                                            .style
                                            .display =
                                            '';


                                        document
                                            .getElementById(
                                                'pda-chat-input-area'
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
                       CHAT UI
                       ========================================== */

                    const getBotAvatarHTML =
                        () => `

                            <div
                                class="
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
                                        pda-animate-message
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
                                        chatHistory.scrollHeight,

                                    behavior:
                                        'smooth'
                                });


                                window.pdaAppBot
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
                                        pda-animate-message
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
                                        chatHistory.scrollHeight,

                                    behavior:
                                        'smooth'
                                });


                                window.pdaAppBot
                                    .updateScrollArrow();

                            },
                            150
                        );

                    }


                    function showTypingIndicator() {


                        const typingId =
                            'pda-typing-' +
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
                                        pda-animate-message
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
                                                pda-typing-dots
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
                                        chatHistory.scrollHeight,

                                    behavior:
                                        'smooth'
                                });


                                window.pdaAppBot
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
                            document.getElementById(
                                id
                            );


                        if (element) {
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
                                        pda-animate-message
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
                                'undefined' &&
                            lucide.createIcons
                        ) {

                            lucide.createIcons();
                        }


                        setTimeout(
                            () => {

                                chatHistory.scrollTo({
                                    top:
                                        chatHistory.scrollHeight,

                                    behavior:
                                        'smooth'
                                });


                                window.pdaAppBot
                                    .updateScrollArrow();

                            },
                            150
                        );

                    }


                    chatHistory.addEventListener(
                        'scroll',
                        () =>
                            window.pdaAppBot
                                .updateScrollArrow()
                    );


                    /* ==========================================
                       MAIN APP
                       ========================================== */

                    window.pdaAppBot = {


                        currentFlow:
                            null,


                        updateScrollArrow:
                            function () {


                                const button =
                                    document.getElementById(
                                        'pda-scroll-down-btn'
                                    );


                                const history =
                                    document.getElementById(
                                        'pda-chat-history'
                                    );


                                if (
                                    !button ||
                                    !history
                                ) {
                                    return;
                                }


                                const awayFromBottom =
                                    Math.ceil(
                                        history.scrollHeight -
                                        history.scrollTop
                                    )
                                    >
                                    history.clientHeight +
                                    15;


                                if (
                                    history.scrollHeight >
                                        history.clientHeight &&
                                    awayFromBottom
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
                                        'pda-hipaa-footer'
                                    )
                                    .style
                                    .display =
                                    '';


                                document
                                    .getElementById(
                                        'pda-chat-input-area'
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
                                        'pda-chat-input-area'
                                    )
                                    .style
                                    .setProperty(
                                        'display',
                                        'none',
                                        'important'
                                    );


                                document
                                    .getElementById(
                                        'pda-hipaa-footer'
                                    )
                                    .style
                                    .display =
                                    '';


                                document
                                    .getElementById(
                                        'pda-scroll-down-btn'
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
                                        'window.pdaAppBot.goBack()'
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


                                navBackBtn
                                    .setAttribute(
                                        'onclick',
                                        'window.pdaAppBot.goBack()'
                                    );


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
                                    'pda-schedule-opts-1',

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
                                                                window.pdaAppBot
                                                                .handleScheduleStep(
                                                                    'patient_type',
                                                                    '${option}'
                                                                )
                                                            "
                                                            class="
                                                                pda-option-btn
                                                                pda-option-blue
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
                                        'pda-schedule-opts-1'
                                        :

                                    field ===
                                        'reason'
                                        ?
                                        'pda-schedule-opts-2'
                                        :

                                        'pda-schedule-opts-3';


                                const container =
                                    document.getElementById(
                                        containerId
                                    );


                                if (container) {

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


                                navBackBtn
                                    .setAttribute(
                                        'onclick',
                                        'window.pdaAppBot.goBack()'
                                    );


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
                                                    window.pdaAppBot
                                                    .handleScheduleStep(
                                                        'reason',
                                                        '${option}'
                                                    )
                                                "
                                                class="
                                                    pda-option-btn
                                                    pda-option-blue
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
                                    'pda-schedule-opts-2',
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
                                        id="pda-schedule-opts-other"
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

                                                window.pdaAppBot
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
                                                    pda-inline-input
                                                "
                                            >


                                            <button
                                                type="submit"
                                                class="
                                                    pda-inline-submit-btn
                                                    flex
                                                    items-center
                                                    justify-center
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
                                    'pda-schedule-opts-other-container',
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
                                    formData.get(
                                        'other_reason'
                                    );


                                if (!reason) {
                                    return;
                                }


                                window.pdaBotState
                                    .schedule
                                    .reason =
                                    'Other';


                                window.pdaBotState
                                    .schedule
                                    .other_reason =
                                    reason;


                                const container =
                                    document
                                        .getElementById(
                                            'pda-schedule-opts-other-container'
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


                                navBackBtn
                                    .setAttribute(
                                        'onclick',
                                        'window.pdaAppBot.goBack()'
                                    );


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
                                    'pda-schedule-opts-3',

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
                                                                window.pdaAppBot
                                                                .handleScheduleStep(
                                                                    'best_time',
                                                                    '${option}'
                                                                )
                                                            "
                                                            class="
                                                                pda-option-btn
                                                                pda-option-blue
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


                        showScheduleStep4:
                            async function () {


                                stepIndicator.innerText =
                                    'Step 4 of 4';


                                navBackBtn
                                    .setAttribute(
                                        'onclick',
                                        'window.pdaAppBot.goBack()'
                                    );


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
                                                pda-animate-message
                                                mt-3
                                                shrink-0
                                            "
                                            id="pda-schedule-form-4"
                                        >

                                            <form
                                                onsubmit="
                                                    event.preventDefault();

                                                    window.pdaAppBot
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
                                                        pda-chat-input-field
                                                    "
                                                    value="${savedName || ''}"
                                                >


                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    placeholder="Phone Number"
                                                    required
                                                    class="
                                                        pda-chat-input-field
                                                    "
                                                >


                                                <input
                                                    type="email"
                                                    name="email"
                                                    placeholder="Email Address (Optional)"
                                                    class="
                                                        pda-chat-input-field
                                                    "
                                                >


                                                <button
                                                    type="submit"
                                                    class="
                                                        pda-form-submit-btn
                                                        pda-form-submit-blue
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
                                        'undefined' &&
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
                                                    'pda-chat-history'
                                                );


                                        if (history) {

                                            history.scrollTo({
                                                top:
                                                    history.scrollHeight,

                                                behavior:
                                                    'smooth'
                                            });


                                            window.pdaAppBot
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


                                navBackBtn
                                    .setAttribute(
                                        'onclick',
                                        'window.pdaAppBot.goBack()'
                                    );


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
                                    'pda-emergency-opts-1',

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
                                                                window.pdaAppBot
                                                                .handleEmergencyStep(
                                                                    '${option}'
                                                                )
                                                            "
                                                            class="
                                                                pda-option-btn
                                                                pda-option-red
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


                                window.pdaBotState
                                    .emergency
                                    .symptom =
                                    value;


                                const options =
                                    document
                                        .getElementById(
                                            'pda-emergency-opts-1'
                                        );


                                if (options) {
                                    options.remove();
                                }


                                appendUserMessage(
                                    value
                                );


                                await wait(
                                    400
                                );


                                stepIndicator.innerText =
                                    'Step 2 of 2';


                                navBackBtn
                                    .setAttribute(
                                        'onclick',
                                        'window.pdaAppBot.goBack()'
                                    );


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
                                                pda-animate-message
                                                mt-3
                                                shrink-0
                                            "
                                            id="pda-emergency-form-2"
                                        >

                                            <form
                                                onsubmit="
                                                    event.preventDefault();

                                                    window.pdaAppBot
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
                                                        pda-chat-input-field
                                                    "
                                                    value="${savedName || ''}"
                                                >


                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    placeholder="Phone Number"
                                                    required
                                                    class="
                                                        pda-chat-input-field
                                                    "
                                                >


                                                <button
                                                    type="submit"
                                                    class="
                                                        pda-form-submit-btn
                                                        pda-form-submit-red
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
                                                    'pda-chat-history'
                                                );


                                        if (history) {

                                            history.scrollTo({
                                                top:
                                                    history.scrollHeight,

                                                behavior:
                                                    'smooth'
                                            });


                                            window.pdaAppBot
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


                                navBackBtn
                                    .setAttribute(
                                        'onclick',
                                        'window.pdaAppBot.goBack()'
                                    );


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
                                                pda-animate-message
                                                mt-3
                                                shrink-0
                                            "
                                            id="pda-reschedule-form"
                                        >

                                            <form
                                                onsubmit="
                                                    event.preventDefault();

                                                    window.pdaAppBot
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
                                                        pda-chat-input-field
                                                    "
                                                    value="${savedName || ''}"
                                                >


                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    placeholder="Phone Number"
                                                    required
                                                    class="
                                                        pda-chat-input-field
                                                    "
                                                >


                                                <textarea
                                                    name="requested_time"
                                                    placeholder="Requested new date & time"
                                                    required
                                                    class="
                                                        pda-chat-input-field
                                                    "
                                                ></textarea>


                                                <button
                                                    type="submit"
                                                    class="
                                                        pda-form-submit-btn
                                                        pda-form-submit-blue
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
                                                    'pda-chat-history'
                                                );


                                        if (history) {

                                            history.scrollTo({
                                                top:
                                                    history.scrollHeight,

                                                behavior:
                                                    'smooth'
                                            });


                                            window.pdaAppBot
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
                                    'pda-call-opts',

                                    `

                                    <a
                                        href="tel:${PDA_OFFICE_PHONE}"
                                        class="
                                            pda-call-cta
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
                           LIVE CHAT
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
                                        'pda-hipaa-footer'
                                    )
                                    .style
                                    .display =
                                    'none';


                                document
                                    .getElementById(
                                        'pda-chat-input-area'
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
                                    () => {

                                        document
                                            .getElementById(
                                                'pda-live-chat-input'
                                            )
                                            .focus();

                                    },
                                    100
                                );

                            },


                        handleChatSend:
                            async function () {


                                const inputElement =
                                    document
                                        .getElementById(
                                            'pda-live-chat-input'
                                        );


                                const submitButton =
                                    document
                                        .getElementById(
                                            'pda-live-chat-submit'
                                        );


                                const message =
                                    inputElement
                                        .value
                                        .trim();


                                if (!message) {
                                    return;
                                }


                                inputElement.value =
                                    '';


                                submitButton.disabled =
                                    true;


                                inputElement.disabled =
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
                                                controller.abort(),
                                            15000
                                        );


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
                                                    JSON.stringify({

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

                                                    }),


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

                                        throw new Error(
                                            'Network error'
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
                                        ) &&
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
                                            'Unrecognized n8n response format:',
                                            data
                                        );


                                        appendBotMessage(
                                            'I’m sorry — I wasn’t able to process that response. Please try again or contact the office directly.'
                                        );

                                    }


                                } catch (
                                    error
                                ) {


                                    removeTypingIndicator(
                                        typingId
                                    );


                                    console.error(
                                        'Chatbot request failed:',
                                        error
                                    );


                                    appendBotMessage(
                                        'I’m sorry — I’m having trouble connecting right now. Please try again or contact the office directly.'
                                    );


                                } finally {


                                    submitButton.disabled =
                                        false;


                                    inputElement.disabled =
                                        false;


                                    inputElement.focus();


                                    if (
                                        typeof lucide !==
                                            'undefined' &&
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


                                const reviewData = [

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
                                            group
                                            m-0
                                        "
                                    >

                                        <div
                                            id="pda-reviews-scroll-wrapper"
                                            class="
                                                flex
                                                overflow-x-auto
                                                gap-3
                                                pb-4
                                                pt-1
                                                snap-x
                                                snap-mandatory
                                                pda-hide-scrollbar
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


                                reviewData.forEach(
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
                                                    m-0
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
                                                                m-0
                                                                leading-tight
                                                            "
                                                        >
                                                            ${review.name}
                                                        </span>


                                                        <span
                                                            class="
                                                                text-slate-400
                                                                text-[10.5px]
                                                                m-0
                                                                mt-0.5
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
                                    'pda-review-opts',

                                    `

                                    <button
                                        type="button"
                                        onclick="
                                            window.pdaAppBot
                                            .startFlow(
                                                'schedule'
                                            )
                                        "
                                        class="
                                            pda-review-cta
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


                        /* ======================================
                           SCHEDULE SUBMIT
                           ====================================== */


                        submitSchedule:
                            async function (
                                form
                            ) {


                                const formData =
                                    new FormData(
                                        form
                                    );


                                const state =
                                    window
                                        .pdaBotState
                                        .schedule;


                                const payload =
                                    this.getBasePayload(
                                        'Schedule An Appointment'
                                    );


                                payload.patient_type =
                                    state.patient_type;


                                payload.reason =
                                    state.reason ===
                                        'Other'
                                        ?
                                        `Other: ${state.other_reason}`
                                        :
                                        state.reason;


                                payload.best_time =
                                    state.best_time;


                                payload.name =
                                    formData.get(
                                        'name'
                                    )
                                    || '';


                                payload.phone =
                                    formData.get(
                                        'phone'
                                    )
                                    || '';


                                payload.email =
                                    formData.get(
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


                        /* ======================================
                           EMERGENCY SUBMIT
                           ====================================== */


                        submitEmergency:
                            async function (
                                form
                            ) {


                                const formData =
                                    new FormData(
                                        form
                                    );


                                const state =
                                    window
                                        .pdaBotState
                                        .emergency;


                                const payload =
                                    this.getBasePayload(
                                        'Dental Emergency'
                                    );


                                payload.emergency_symptom =
                                    state.symptom;


                                payload.name =
                                    formData.get(
                                        'name'
                                    )
                                    || '';


                                payload.phone =
                                    formData.get(
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


                        /* ======================================
                           RESCHEDULE SUBMIT
                           ====================================== */


                        submitReschedule:
                            async function (
                                form
                            ) {


                                const formData =
                                    new FormData(
                                        form
                                    );


                                const payload =
                                    this.getBasePayload(
                                        'Reschedule Appointment'
                                    );


                                payload.requested_time =
                                    formData.get(
                                        'requested_time'
                                    )
                                    || '';


                                payload.name =
                                    formData.get(
                                        'name'
                                    )
                                    || '';


                                payload.phone =
                                    formData.get(
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
                           PROCESS SUBMISSION
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

                                        throw new Error(
                                            'Network error'
                                        );

                                    }


                                    stepIndicator.innerText =
                                        'Done';


                                    this.showConfirmation(
                                        type
                                    );


                                } catch (
                                    error
                                ) {


                                    console.error(
                                        'Webhook Fetch Error:',
                                        error
                                    );


                                    stepIndicator.innerText =
                                        'Demo Mode';


                                    this.showConfirmation(
                                        type
                                    );

                                }

                            },


                        /* ======================================
                           CONFIRMATION
                           ====================================== */


                        showConfirmation:
                            function (
                                type
                            ) {


                                setTimeout(
                                    () => {


                                        let confirmText =

                                            'We received your request and just sent a text message to the phone number you provided. We will be in touch shortly!';


                                        if (
                                            type ===
                                            'Emergency'
                                        ) {

                                            confirmText =

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
                                                        pda-animate-message
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
                                                            ${confirmText}
                                                        </p>


                                                        <button
                                                            type="button"
                                                            onclick="
                                                                window.pdaAppBot
                                                                .goBack()
                                                            "
                                                            class="
                                                                pda-success-back-btn
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
                                                'undefined' &&
                                            lucide.createIcons
                                        ) {

                                            lucide.createIcons();
                                        }


                                        setTimeout(
                                            () => {

                                                chatHistory.scrollTo({
                                                    top:
                                                        chatHistory.scrollHeight,

                                                    behavior:
                                                        'smooth'
                                                });


                                                window.pdaAppBot
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
                        initPDAWidget
                    );

                } else {

                    initPDAWidget();
                }

            })();


        } catch (error) {

            console.error(
                'Plaza Dental Arts chatbot failed to initialize:',
                error
            );


            root.style.removeProperty(
                'visibility'
            );
        }

    }


    if (
        document.readyState ===
        'loading'
    ) {

        document.addEventListener(
            'DOMContentLoaded',
            bootPDAChatbot,
            {
                once: true
            }
        );

    } else {

        bootPDAChatbot();
    }

})();
