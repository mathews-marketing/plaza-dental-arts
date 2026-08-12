(function() {
    // Prevent double injection if the script is accidentally loaded twice
    if (window.PdaChatbotInitialized) return;
    window.PdaChatbotInitialized = true;

    function loadDependencies() {
        // 1. Tailwind Config (Must be set before Tailwind loads)
        const twConfig = document.createElement('script');
        twConfig.innerHTML = `
            window.tailwind = {
                important: '#archie-widget-container',
                corePlugins: { preflight: false },
                theme: {
                    extend: {
                        fontFamily: { sans: ['"Plus Jakarta Sans"', 'sans-serif'] },
                        colors: {
                            premium: { 50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 800: '#23323e', 900: '#304454', 950: '#1b2731' },
                            accent: { 400: '#3ebfe0', 500: '#0f57bc', 600: '#0d4a9f', cta: '#2cb0ca' }
                        },
                        boxShadow: {
                            'elegant': '0px 30px 60px -15px rgba(0, 0, 0, 0.4), 0px 10px 30px -5px rgba(0, 0, 0, 0.2)',
                            'trigger': '0px 15px 35px -5px rgba(15, 87, 188, 0.35)',
                            'card': '0px 4px 20px -2px rgba(0, 0, 0, 0.05)'
                        }
                    }
                }
            };
        `;
        document.head.appendChild(twConfig);

        // 2. Load Google Fonts
        const fontPreconnect1 = document.createElement('link'); fontPreconnect1.rel = 'preconnect'; fontPreconnect1.href = 'https://fonts.googleapis.com';
        const fontPreconnect2 = document.createElement('link'); fontPreconnect2.rel = 'preconnect'; fontPreconnect2.href = 'https://fonts.gstatic.com'; fontPreconnect2.crossOrigin = 'anonymous';
        const fontStyles = document.createElement('link'); fontStyles.rel = 'stylesheet'; fontStyles.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap';
        document.head.append(fontPreconnect1, fontPreconnect2, fontStyles);

        // 3. Load Tailwind & Lucide Scripts
        const twScript = document.createElement('script'); twScript.src = "https://cdn.tailwindcss.com";
        const lucideScript = document.createElement('script'); lucideScript.src = "https://unpkg.com/lucide@latest";
        
        document.head.append(twScript, lucideScript);
        
        // Wait for Lucide to load before initializing icons
        lucideScript.onload = () => {
            if (typeof lucide !== 'undefined' && lucide.createIcons) { lucide.createIcons(); }
        };
    }

    function injectStyles() {
        const style = document.createElement('style');
        style.innerHTML = `
            #archie-widget-container {
                all: initial !important; 
                font-family: 'Plus Jakarta Sans', sans-serif !important;
            }
            #archie-widget-container * { 
                box-sizing: border-box !important; 
                font-family: 'Plus Jakarta Sans', sans-serif !important;
                letter-spacing: normal !important;
            }
            #archie-widget-container button { 
                outline: none !important; 
                cursor: pointer !important; 
                background: transparent !important;
                border: none !important;
                box-shadow: none !important;
                padding: 0 !important;
                margin: 0 !important;
                border-radius: 0 !important;
                line-height: normal !important;
            }
            #archie-widget-container svg {
                display: block !important;
                max-width: 100% !important;
                height: auto !important;
            }
            
            .chat-input-field {
                width: 100% !important;
                padding: 12px 16px !important;
                border-radius: 10px !important;
                background-color: #f8fafc !important;
                border: 1px solid #e2e8f0 !important;
                font-size: 14px !important;
                color: #304454 !important;
                margin: 0 0 12px 0 !important;
                outline: none !important;
                transition: all 0.2s ease !important;
                box-shadow: none !important;
                line-height: 1.5 !important;
                min-height: 44px !important;
                -webkit-appearance: none !important;
            }
            .chat-input-field:focus {
                background-color: #ffffff !important;
                border-color: #0f57bc !important;
                box-shadow: 0 0 0 3px rgba(15, 87, 188, 0.15) !important;
            }
            .chat-input-field::placeholder { color: #94a3b8 !important; }
            
            @keyframes smoothSpringUp { 0% { opacity: 0; transform: translateY(20px) scale(0.98); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
            @keyframes smoothSpringDown { 0% { opacity: 1; transform: translateY(0) scale(1); } 100% { opacity: 0; transform: translateY(15px) scale(0.98); visibility: hidden; } }
            @keyframes slideInUp { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
            @keyframes pulse-dot { 0% { box-shadow: 0 0 0 0 rgba(15, 87, 188, 0.6); } 70% { box-shadow: 0 0 0 6px rgba(15, 87, 188, 0); } 100% { box-shadow: 0 0 0 0 rgba(15, 87, 188, 0); } }
            @keyframes bounceAttention { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
            @keyframes gentleBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }

            .typing-dots { display: flex; gap: 4px; padding: 6px 4px; }
            .typing-dots span { width: 6px; height: 6px; background-color: #94a3b8; border-radius: 50%; animation: typingBounce 1.4s infinite ease-in-out both; }
            .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
            .typing-dots span:nth-child(2) { animation-delay: -0.16s; }
            @keyframes typingBounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }

            .widget-hidden { pointer-events: none; animation: smoothSpringDown 0.25s cubic-bezier(0.4, 0, 1, 1) forwards; }
            .widget-visible { pointer-events: auto; animation: smoothSpringUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
            .animate-message { animation: slideInUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
            .status-dot { animation: pulse-dot 2s infinite; }
            .animate-attention { animation: bounceAttention 0.4s ease-in-out 2; }
            .animate-gentle-bounce { animation: gentleBounce 1.5s ease-in-out infinite; }

            .custom-scrollbar::-webkit-scrollbar { width: 5px; height: 5px; }
            .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
            .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
            .hide-scrollbar::-webkit-scrollbar { display: none; }
            .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `;
        document.head.appendChild(style);
    }

    function injectHTML() {
        const container = document.createElement('div');
        container.id = 'archie-widget-wrapper';
        
        // The inline style here is CRITICAL. It prevents the widget from showing up 
        // on the top-left while Tailwind finishes loading.
        container.innerHTML = `
        <div id="archie-widget-container" class="!fixed !bottom-4 !right-4 sm:!bottom-6 sm:!right-6 !z-[99999] !flex !flex-col !items-end !antialiased" style="position: fixed !important; bottom: 20px !important; right: 20px !important; z-index: 2147483647 !important; display: flex !important; flex-direction: column !important; align-items: flex-end !important;">
            
            <div id="widget-panel" class="!fixed !inset-0 sm:!relative sm:!inset-auto !w-full !h-[100dvh] sm:!w-[360px] sm:!h-[620px] !bg-white sm:!rounded-[24px] !shadow-none sm:!shadow-elegant !border-none sm:!border !border-slate-200 !origin-bottom-right !flex-col !overflow-hidden !text-[#304454] !z-[100]" style="display: none; margin-bottom: 16px;">
                
                <div id="bento-view" class="!absolute !inset-0 !flex !flex-col !w-full !h-full !transition-all !duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] !opacity-100 !translate-x-0 !bg-white">
                    <div class="!h-[72px] !px-5 !flex !justify-between !items-center !bg-[#0f57bc] !relative !z-10 !overflow-hidden !shrink-0">
                        <div class="!flex !items-center !gap-4 !relative !z-10">
                            <div class="!relative !shrink-0">
                                <div class="!w-14 !h-14 !rounded-full !overflow-hidden !border-2 !border-white !shadow-md !bg-white">
                                    <img src="https://assets.cdn.filesafe.space/jwSB6dgnvqYwCtaIHqjF/media/6a70e1c1a1aa89ccfe046ba2.png" alt="Zoey - AI Assistant" class="!w-full !h-full !object-cover">
                                </div>
                                <span class="!absolute !bottom-0 !right-0 !w-3.5 !h-3.5 !bg-emerald-400 !border-2 !border-white !rounded-full status-dot"></span>
                            </div>
                            <div>
                                <h3 class="!text-white !text-[17px] !font-bold !tracking-tight !leading-none !mb-1.5 !m-0">Plaza Dental Arts</h3>
                                <p class="!text-white/80 !text-[12.5px] !font-medium !leading-none !m-0">Zoey • AI Assistant</p>
                            </div>
                        </div>
                        <button onclick="window.toggleWidget()" class="!flex !items-center !justify-center !w-9 !h-9 !text-white/70 hover:!text-white !transition-colors hover:!bg-white/10 !rounded-full !shrink-0 active:!scale-95 !bg-transparent">
                            <i data-lucide="x" class="!w-5 !h-5"></i>
                        </button>
                    </div>

                    <div class="!p-5 !flex !flex-col !gap-3 !bg-[#FAFAFA] !flex-1 !overflow-y-auto custom-scrollbar">
                        <div id="welcome-bubble" class="!bg-white !border !border-slate-100 !shadow-card !rounded-2xl !rounded-tr-sm !p-4 !text-[13.5px] !text-slate-600 !leading-relaxed !font-medium !m-0">
                            Welcome to Plaza Dental Arts! I'm here to help you get scheduled, answer questions, or connect you with our team. How can I assist you today?
                        </div>
                        
                        <button onclick="window.appBot.startFlow('schedule')" class="!w-full !bg-[#0f57bc] !text-white !py-4 !px-4 !rounded-[14px] !flex !items-center !justify-between !transition-all !duration-200 group active:!scale-[0.98] !shadow-sm hover:!shadow-md hover:!bg-[#0d4a9f]">
                            <div class="!flex !items-center !gap-3 !flex-1 !min-w-0 !mr-2">
                                <div class="!bg-white/20 !text-white !w-10 !h-10 !rounded-xl !shrink-0 !flex !items-center !justify-center">
                                    <i data-lucide="calendar" class="!w-5 !h-5"></i>
                                </div>
                                <div class="!text-left !flex !flex-col !justify-center !flex-1 !min-w-0 !overflow-hidden">
                                    <span class="!block !font-bold !text-[15px] !mb-0.5 !tracking-tight !text-white !leading-none !truncate !w-full">Schedule Appointment</span>
                                    <span class="!block !text-white/90 !text-[11.5px] !font-medium !tracking-wide !leading-none !truncate !w-full">New & existing patients • Takes 60s</span>
                                </div>
                            </div>
                            <div class="!bg-white/20 !w-7 !h-7 !rounded-full !shrink-0 !flex !items-center !justify-center group-hover:!bg-white/30 !transition-colors">
                                <i data-lucide="chevron-right" class="!w-4 !h-4 !text-white !ml-0.5"></i>
                            </div>
                        </button>

                        <button onclick="window.appBot.startFlow('emergency')" class="!w-full !bg-[#fff4f4] !text-[#d92d20] !py-4 !px-4 !rounded-[14px] !flex !items-center !justify-between hover:!bg-[#ffeaea] !transition-all !duration-200 group active:!scale-[0.98] !border !border-[#ffdede] !mt-0.5">
                            <div class="!flex !items-center !gap-3 !flex-1 !min-w-0 !mr-2">
                                <div class="!bg-white !text-[#d92d20] !w-10 !h-10 !rounded-xl !shrink-0 !flex !items-center !justify-center !shadow-sm !border !border-red-100/50">
                                    <i data-lucide="shield-alert" class="!w-5 !h-5"></i>
                                </div>
                                <div class="!text-left !flex !flex-col !justify-center !flex-1 !min-w-0 !overflow-hidden">
                                    <span class="!block !font-bold !text-[15px] !mb-0.5 !tracking-tight !text-[#d92d20] !leading-none !truncate !w-full">Dental Emergency</span>
                                    <span class="!block !text-[#f04438] !text-[11.5px] !font-medium !tracking-wide !leading-none !truncate !w-full">Call us immediately • We're here to help</span>
                                </div>
                            </div>
                            <div class="!w-2 !h-2 !bg-[#f04438] !rounded-full !shrink-0 !opacity-80 group-hover:!opacity-100 !transition-opacity"></div>
                        </button>

                        <div class="!grid !grid-cols-2 !gap-2 !mt-1 !m-0">
                            <button onclick="window.appBot.startFlow('reschedule')" class="!flex !items-center !gap-2 !py-3.5 !px-3 !rounded-xl !border !border-slate-200 !bg-white !shadow-sm hover:!shadow-md hover:!bg-slate-50 hover:!border-[#0f57bc]/30 !transition-all !duration-200 group active:!scale-95 !m-0 !text-left">
                                <i data-lucide="calendar-clock" class="!w-4 !h-4 !text-slate-400 group-hover:!text-[#0f57bc] !transition-colors !shrink-0"></i>
                                <span class="!text-[12px] !font-semibold !text-slate-700 group-hover:!text-[#0f57bc] !transition-colors !leading-tight !tracking-tight !block">Reschedule</span>
                            </button>
                            <button onclick="window.appBot.startFlow('question')" class="!flex !items-center !gap-2 !py-3.5 !px-3 !rounded-xl !border !border-slate-200 !bg-white !shadow-sm hover:!shadow-md hover:!bg-slate-50 hover:!border-[#0f57bc]/30 !transition-all !duration-200 group active:!scale-95 !m-0 !text-left">
                                <i data-lucide="message-circle" class="!w-4 !h-4 !text-slate-400 group-hover:!text-[#0f57bc] !transition-colors !shrink-0"></i>
                                <span class="!text-[12px] !font-semibold !text-slate-700 group-hover:!text-[#0f57bc] !transition-colors !leading-tight !tracking-tight !block">Ask Question</span>
                            </button>
                            <button onclick="window.appBot.startFlow('call')" class="!flex !items-center !gap-2 !py-3.5 !px-3 !rounded-xl !border !border-slate-200 !bg-white !shadow-sm hover:!shadow-md hover:!bg-slate-50 hover:!border-[#0f57bc]/30 !transition-all !duration-200 group active:!scale-95 !m-0 !text-left">
                                <i data-lucide="phone" class="!w-4 !h-4 !text-slate-400 group-hover:!text-[#0f57bc] !transition-colors !shrink-0"></i>
                                <span class="!text-[12px] !font-semibold !text-slate-700 group-hover:!text-[#0f57bc] !transition-colors !leading-tight !tracking-tight !block">Call Us</span>
                            </button>
                            <button onclick="window.appBot.startFlow('reviews')" class="!flex !items-center !gap-2 !py-3.5 !px-3 !rounded-xl !border !border-slate-200 !bg-white !shadow-sm hover:!shadow-md hover:!bg-slate-50 hover:!border-[#0f57bc]/30 !transition-all !duration-200 group active:!scale-95 !m-0 !text-left">
                                <i data-lucide="star" class="!w-4 !h-4 !text-slate-400 group-hover:!text-[#0f57bc] !transition-colors !shrink-0"></i>
                                <span class="!text-[12px] !font-semibold !text-slate-700 group-hover:!text-[#0f57bc] !transition-colors !leading-tight !tracking-tight !block">Reviews</span>
                            </button>
                        </div>
                    </div>
                    
                    <div class="!bg-white !p-3.5 !border-t !border-slate-100 !flex !items-center !justify-center !gap-2 !shrink-0 !m-0">
                        <i data-lucide="smile" class="!w-4 !h-4 !text-[#2cb0ca]"></i>
                        <span class="!text-[10px] !text-slate-500 !font-bold !tracking-widest !uppercase">Exceptional Dental Care</span>
                    </div>
                </div>

                <div id="chat-view" class="!absolute !inset-0 !flex !flex-col !w-full !h-full !transition-all !duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] !opacity-0 !translate-x-full !pointer-events-none !bg-white !z-10">
                    <div class="!h-[72px] !px-5 !flex !items-center !justify-between !bg-[#0f57bc] !relative !z-10 !overflow-hidden !shrink-0 !m-0">
                        <div class="!flex !items-center !gap-4 !relative !z-10">
                            <div class="!relative !shrink-0">
                                <div class="!w-14 !h-14 !rounded-full !overflow-hidden !border-2 !border-white !shadow-md !bg-white">
                                    <img src="https://assets.cdn.filesafe.space/jwSB6dgnvqYwCtaIHqjF/media/6a70e1c1a1aa89ccfe046ba2.png" alt="Zoey" class="!w-full !h-full !object-cover">
                                </div>
                                <span class="!absolute !bottom-0 !right-0 !w-3.5 !h-3.5 !bg-emerald-400 !border-2 !border-white !rounded-full status-dot"></span>
                            </div>
                            <div>
                                <h4 id="chat-header-title" class="!text-[17px] !font-bold !text-white !leading-none !mb-1.5 !m-0">Plaza Dental Arts</h4>
                                <span class="!text-[12.5px] !text-white/80 !font-medium !leading-none !block">Online • Ready to help</span>
                            </div>
                        </div>
                        <button onclick="window.toggleWidget()" class="!flex !items-center !justify-center !w-9 !h-9 !text-white/70 hover:!text-white !transition-colors !rounded-lg hover:!bg-white/10 active:!scale-90 !relative !z-10 !bg-transparent">
                            <i data-lucide="x" class="!w-5 !h-5"></i>
                        </button>
                    </div>

                    <div id="chat-nav" class="!px-5 !pt-4 !pb-2 !bg-[#FAFAFA] !flex !justify-between !items-center !shrink-0 !border-b !border-slate-100/50 !m-0">
                        <button id="nav-back-btn" onclick="window.appBot.goBack()" class="!flex !items-center !gap-1.5 !text-[13px] !font-bold !text-slate-500 hover:!text-[#0f57bc] !transition-colors active:!scale-95 !bg-transparent">
                            <i data-lucide="arrow-left" class="!w-4 !h-4"></i> Back
                        </button>
                        <span id="step-indicator" class="!text-[10px] !font-bold !text-slate-500 !uppercase !tracking-widest !bg-slate-200/50 !px-2.5 !py-1 !rounded-full">Step 1 of 2</span>
                    </div>

                    <div id="chat-history" class="!flex-1 !overflow-y-auto !overflow-x-hidden !p-5 !pt-4 !flex !flex-col !gap-4 !bg-[#FAFAFA] custom-scrollbar !pb-6 !relative !m-0">
                        <!-- Dynamic content gets injected here -->
                    </div>

                    <button id="scroll-down-btn" onclick="document.getElementById('chat-history').scrollTo({top: document.getElementById('chat-history').scrollHeight, behavior: 'smooth'})" class="!absolute !bottom-[90px] !left-2 !bg-[#0f57bc] !text-white !border !border-[#0d4a9f] !rounded-full !w-8 !h-8 !shadow-md hover:!bg-[#0d4a9f] !transition-all !z-20 animate-gentle-bounce !flex !items-center !justify-center active:!scale-95 hover:!shadow-lg !m-0" style="display: none !important;">
                        <i data-lucide="arrow-down" class="!w-4 !h-4"></i>
                    </button>

                    <div id="chat-input-area" class="!p-3 !bg-white !border-t !border-slate-100 !shrink-0 !flex-col !gap-2 !m-0" style="display: none !important;">
                        <button onclick="window.appBot.startFlow('schedule')" class="!w-full !bg-[#0f57bc] !text-white hover:!bg-[#0d4a9f] !py-2.5 !rounded-xl !text-[13px] !font-bold !transition-all !shadow-sm active:!scale-95 !flex !items-center !justify-center !gap-2 !m-0">
                            <i data-lucide="calendar-plus" class="!w-4 !h-4"></i> Schedule Appointment
                        </button>
                        <form onsubmit="event.preventDefault(); window.appBot.handleChatSend();" class="!relative !flex !items-center !m-0 !p-0 !mt-1 !w-full">
                            <input type="text" id="live-chat-input" placeholder="Type your message..." autocomplete="off" class="!w-full !bg-slate-50 !border !border-slate-200 !text-[14px] !rounded-full !py-3 !pl-4 !pr-12 focus:!outline-none focus:!border-[#0f57bc]/50 focus:!ring-2 focus:!ring-[#0f57bc]/10 !transition-all !text-slate-700 placeholder:!text-slate-400 !m-0 !shadow-none">
                            <button id="live-chat-submit" type="submit" class="!absolute !right-1.5 !p-2 !bg-[#0f57bc] !text-white !rounded-full hover:!bg-[#0d4a9f] hover:!scale-105 active:!scale-95 !transition-all !shadow-sm disabled:!opacity-50 disabled:!cursor-not-allowed !flex !items-center !justify-center !m-0">
                                <i data-lucide="send" class="!w-4 !h-4 !ml-0.5 !mt-0.5"></i>
                            </button>
                        </form>
                    </div>

                    <div id="hipaa-footer" class="!p-3 !bg-white !border-t !border-slate-100 !text-center !shrink-0 !m-0">
                        <p class="!text-[10px] !text-slate-400 !font-bold !tracking-widest !uppercase !flex !items-center !justify-center !gap-1.5 !m-0">
                            <i data-lucide="lock" class="!w-3 !h-3"></i> HIPAA Compliant Portal
                        </p>
                    </div>
                </div>

            </div>

            <div class="!flex !items-end !gap-3 !z-50 !flex-row">
                <div id="trigger-bubble" onclick="window.toggleWidget()" style="display: none;" class="!opacity-0 !scale-95 !translate-y-3 !pointer-events-none !bg-white !px-4 !py-3 !rounded-2xl !rounded-br-sm !shadow-elegant !border !border-slate-100 !cursor-pointer hover:!-translate-y-1 !transition-all !duration-300 !relative !max-w-[180px]">
                    <span id="trigger-text" class="!text-[13px] !font-bold !text-[#304454] !tracking-tight !leading-snug !block !m-0">Have questions? We’re online and happy to help</span>
                </div>

                <button id="trigger-btn" type="button" onclick="window.toggleWidget()" class="hover:!scale-105 active:!scale-95 !transition-all !duration-300 !m-0 !p-0 !bg-transparent" style="width: 54px; height: 54px; border-radius: 50%; position: relative; flex-shrink: 0; box-shadow: 0px 15px 35px -5px rgba(15,87,188,0.25);">
                    <div id="icon-default" style="width: 54px; height: 54px; border-radius: 50%; overflow: hidden; border: 3px solid white; background-color: white; position: absolute; top: 0; left: 0; display: block;">
                        <img src="https://assets.cdn.filesafe.space/jwSB6dgnvqYwCtaIHqjF/media/6a70e1c1a1aa89ccfe046ba2.png" alt="Chat with us" style="width: 100%; height: 100%; object-fit: cover; display: block; border-radius: 50%;">
                    </div>
                    <div id="icon-active" style="display: none; width: 54px; height: 54px; border-radius: 50%; background-color: #0f57bc !important; position: absolute; top: 0; left: 0; align-items: center; justify-content: center; border: 2px solid #0f57bc;">
                        <i data-lucide="x" style="width: 24px; height: 24px; color: white;"></i>
                    </div>
                    <span id="trigger-dot" class="!absolute !bottom-0 !right-0 !w-3.5 !h-3.5 !bg-emerald-400 !border-2 !border-white !rounded-full status-dot !z-10"></span>
                    <span id="notification-badge" style="display: none;" class="!absolute !-top-1 !-right-1 !h-4 !w-4 !items-center !justify-center !rounded-full !bg-red-500 !text-[10px] !font-bold !text-white !shadow-sm !opacity-0 !scale-0 !transition-all !duration-300 !z-10 !border !border-white">1</span>
                </button>
            </div>
        </div>
        `;
        document.body.appendChild(container);
    }

    function initLogic() {
        window.pdaBotState = {
            schedule: { patient_type: '', reason: '', other_reason: '', best_time: '' },
            emergency: { symptom: '' },
            reschedule: { current_time: '' }
        };

        const WEBHOOK_URL = 'https://api.mikemathewscmo.com/webhook/pda-website-chatbot'; 
        const QUESTION_WEBHOOK_URL = 'https://api.mikemathewscmo.com/webhook/pda-website-askquestion';
        const NOTIFICATION_SOUND_URL = 'https://assets.cdn.filesafe.space/pavIFdgrv0CTos4BgVKm/media/6a01a85abc1f77cc3588852a.mp3';
        const MESSAGE_SOUND_URL = 'https://assets.cdn.filesafe.space/pavIFdgrv0CTos4BgVKm/media/6a3ec3a6d50c4ff184ddb813.mp3';
        const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        let isWidgetOpen = false;
        let hasInteracted = false;
        let hasPlayedSound = false;
        let badgeVisible = false;
        let audioUnlocked = false;
        
        let dingAudio = new Audio(NOTIFICATION_SOUND_URL);
        let msgAudio = new Audio(MESSAGE_SOUND_URL);
        
        function createTrackingId(prefix) { return prefix + '-' + ((typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : Date.now() + '-' + Math.random().toString(36).substr(2, 9)); }
        function getChatVisitorId() { let id = localStorage.getItem('pdaChatVisitorId'); if (!id) { id = createTrackingId('visitor'); localStorage.setItem('pdaChatVisitorId', id); } return id; }
        function getChatSessionId() { let id = localStorage.getItem('chatSessionId'); if (!id) { id = createTrackingId('sid'); localStorage.setItem('chatSessionId', id); } return id; }
        function getSavedFirstName() { const n = localStorage.getItem('pdaBotName'); return n ? n.split(' ')[0].charAt(0).toUpperCase() + n.split(' ')[0].slice(1) : null; }

        dingAudio.load(); msgAudio.load();

        const panel = document.getElementById('widget-panel');
        const triggerBtn = document.getElementById('trigger-btn');
        const triggerBubble = document.getElementById('trigger-bubble');
        const bentoView = document.getElementById('bento-view');
        const chatView = document.getElementById('chat-view');
        const chatHistory = document.getElementById('chat-history');
        const triggerText = document.getElementById('trigger-text');
        const iconDefault = document.getElementById('icon-default');
        const iconActive = document.getElementById('icon-active');
        const triggerDot = document.getElementById('trigger-dot');
        const notificationBadge = document.getElementById('notification-badge');
        const chatHeaderTitle = document.getElementById('chat-header-title');
        const stepIndicator = document.getElementById('step-indicator');
        const navBackBtn = document.getElementById('nav-back-btn');

        const savedName = getSavedFirstName();
        if (savedName) {
            if (triggerText) triggerText.innerHTML = `Welcome back, ${savedName}! We're online to help.`;
            const wb = document.getElementById('welcome-bubble');
            if (wb) wb.innerHTML = `Welcome back, ${savedName}! Welcome to Plaza Dental Arts. I'm here to help you get scheduled, answer questions, or connect you with our team.`;
        }

        function playMessageSound() { let sound = msgAudio.cloneNode(); sound.volume = 0.4; sound.play().catch(e => {}); }
        function attemptDing() { if (hasPlayedSound) return; const p = dingAudio.play(); if (p !== undefined) p.then(() => hasPlayedSound = true).catch(e => {}); }
        
        function triggerNotification() {
            if (isWidgetOpen || badgeVisible) return;
            badgeVisible = true;
            if(notificationBadge) { notificationBadge.style.display = 'flex'; setTimeout(() => { notificationBadge.classList.remove('!opacity-0', '!scale-0'); notificationBadge.classList.add('!opacity-100', '!scale-100'); }, 10); }
            if(triggerBubble) { triggerBubble.style.display = 'block'; setTimeout(() => { triggerBubble.classList.remove('!opacity-0', '!scale-95', '!translate-y-3', '!pointer-events-none'); triggerBubble.classList.add('animate-attention'); setTimeout(() => triggerBubble.classList.remove('animate-attention'), 1000); }, 10); }
            attemptDing(); 
        }

        setTimeout(triggerNotification, 3000);

        const unlockAudio = () => {
            if (audioUnlocked) return; audioUnlocked = true;
            if (!hasPlayedSound && badgeVisible) attemptDing();
            else { dingAudio.play().then(() => { dingAudio.pause(); dingAudio.currentTime = 0; }).catch(()=>{}); msgAudio.play().then(() => { msgAudio.pause(); msgAudio.currentTime = 0; }).catch(()=>{}); }
            ['click', 'keydown', 'touchstart', 'scroll', 'mousemove', 'wheel'].forEach(evt => document.removeEventListener(evt, unlockAudio));
        };
        ['click', 'keydown', 'touchstart', 'scroll', 'mousemove', 'wheel'].forEach(evt => document.addEventListener(evt, unlockAudio, { passive: true }));

        window.toggleWidget = function() {
            isWidgetOpen = !isWidgetOpen; hasInteracted = true; 
            if (isWidgetOpen && !hasPlayedSound) attemptDing();
            
            if (isWidgetOpen) {
                panel.style.display = 'flex'; panel.classList.remove('animate-fade-out-down');
                setTimeout(() => { panel.classList.remove('widget-hidden'); panel.classList.add('widget-visible'); }, 10);
                triggerBubble.style.display = 'none'; iconDefault.style.display = 'none'; iconActive.style.display = 'flex'; triggerDot.style.display = 'none';
                notificationBadge.classList.add('!opacity-0', '!scale-0'); notificationBadge.classList.remove('!opacity-100', '!scale-100');
            } else {
                panel.classList.remove('widget-visible'); panel.classList.add('widget-hidden');
                setTimeout(() => {
                    panel.style.display = 'none';
                    chatView.classList.add('!opacity-0', '!translate-x-full', '!pointer-events-none'); chatView.classList.remove('!opacity-100', '!translate-x-0');
                    bentoView.classList.add('!opacity-100', '!translate-x-0'); bentoView.classList.remove('!opacity-0', '!-translate-x-10', '!pointer-events-none');
                    document.getElementById('hipaa-footer').style.display = ''; document.getElementById('chat-input-area').style.setProperty('display', 'none', 'important');
                }, 250);

                triggerBubble.style.display = 'block'; triggerBubble.classList.remove('!opacity-0', '!scale-95', '!translate-y-3', '!pointer-events-none');
                triggerText.innerHTML = savedName ? `Welcome back, ${savedName}! We're online to help.` : "Have questions? We’re online and happy to help";
                iconActive.style.display = 'none'; iconDefault.style.display = 'block'; triggerDot.style.display = 'block';
            }
        };

        const getBotAvatarHTML = () => `<div class="!w-7 !h-7 !rounded-full !overflow-hidden !shrink-0 !mt-1 !shadow-sm !bg-white !border !border-slate-100"><img src="https://assets.cdn.filesafe.space/jwSB6dgnvqYwCtaIHqjF/media/6a70e1c1a1aa89ccfe046ba2.png" alt="Zoey" class="!w-full !h-full !object-cover"></div>`;
        
        function appendBotMessage(text) {
            if (isWidgetOpen) playMessageSound();
            chatHistory.insertAdjacentHTML('beforeend', `<div class="!flex !gap-2.5 !w-[90%] animate-message !shrink-0">${getBotAvatarHTML()}<div class="!bg-white !border !border-slate-100 !rounded-2xl !rounded-tl-sm !p-3.5 !shadow-card !text-[13.5px] !text-slate-700 !leading-relaxed !font-medium">${text}</div></div>`);
            setTimeout(() => { chatHistory.scrollTo({top: chatHistory.scrollHeight, behavior: 'smooth'}); window.appBot.updateScrollArrow(); }, 150);
        }

        function appendUserMessage(text) {
            chatHistory.insertAdjacentHTML('beforeend', `<div class="!flex !gap-2 !w-[85%] !self-end !justify-end animate-message !shrink-0"><div class="!bg-[#0f57bc] !text-white !rounded-2xl !rounded-tr-sm !p-3.5 !shadow-sm !text-[13.5px] !leading-relaxed !font-medium">${text}</div></div>`);
            setTimeout(() => { chatHistory.scrollTo({top: chatHistory.scrollHeight, behavior: 'smooth'}); window.appBot.updateScrollArrow(); }, 150);
        }

        function showTypingIndicator() {
            const typingId = 'typing-' + Date.now();
            chatHistory.insertAdjacentHTML('beforeend', `<div id="${typingId}" class="!flex !gap-2.5 !w-[90%] animate-message !shrink-0">${getBotAvatarHTML()}<div class="!bg-white !border !border-slate-100 !rounded-2xl !rounded-tl-sm !p-3.5 !shadow-card !flex !items-center !h-[42px]"><div class="typing-dots"><span></span><span></span><span></span></div></div></div>`);
            setTimeout(() => { chatHistory.scrollTo({top: chatHistory.scrollHeight, behavior: 'smooth'}); window.appBot.updateScrollArrow(); }, 150);
            return typingId;
        }

        function removeTypingIndicator(id) { const el = document.getElementById(id); if (el) el.remove(); }
        async function appendBotMessageWithTyping(text, delayMs = 1200) { const typingId = showTypingIndicator(); return new Promise(resolve => { setTimeout(() => { removeTypingIndicator(typingId); appendBotMessage(text); resolve(); }, delayMs); }); }
        
        function appendOptions(id, htmlStr) {
            chatHistory.insertAdjacentHTML('beforeend', `<div id="${id}" class="!flex !flex-col !w-full animate-message !mt-1 !shrink-0">${htmlStr}</div>`);
            if (typeof lucide !== 'undefined' && lucide.createIcons) { lucide.createIcons(); }
            setTimeout(() => { chatHistory.scrollTo({top: chatHistory.scrollHeight, behavior: 'smooth'}); window.appBot.updateScrollArrow(); }, 150);
        }

        if (chatHistory) { chatHistory.addEventListener('scroll', () => window.appBot.updateScrollArrow()); }

        window.appBot = {
            currentFlow: null,
            updateScrollArrow: function() {
                const btn = document.getElementById('scroll-down-btn'); const history = document.getElementById('chat-history'); if (!btn || !history) return;
                if (history.scrollHeight > history.clientHeight && Math.ceil(history.scrollHeight - history.scrollTop) > history.clientHeight + 15) { btn.style.setProperty('display', 'flex', 'important'); } else { btn.style.setProperty('display', 'none', 'important'); }
            },
            goBack: function() {
                document.getElementById('hipaa-footer').style.display = ''; document.getElementById('chat-input-area').style.setProperty('display', 'none', 'important');
                chatView.classList.remove('!opacity-100', '!translate-x-0'); chatView.classList.add('!opacity-0', '!translate-x-full', '!pointer-events-none');
                bentoView.classList.remove('!opacity-0', '!-translate-x-10', '!pointer-events-none'); bentoView.classList.add('!opacity-100', '!translate-x-0');
            },
            startFlow: async function(flowType) {
                document.getElementById('chat-input-area').style.setProperty('display', 'none', 'important'); document.getElementById('hipaa-footer').style.display = ''; document.getElementById('scroll-down-btn').style.setProperty('display', 'none', 'important');
                bentoView.classList.remove('!opacity-100', '!translate-x-0'); bentoView.classList.add('!opacity-0', '!-translate-x-10', '!pointer-events-none');
                chatView.classList.remove('!opacity-0', '!translate-x-full', '!pointer-events-none'); chatView.classList.add('!opacity-100', '!translate-x-0');
                chatHistory.innerHTML = ''; stepIndicator.classList.remove('!opacity-0');
                navBackBtn.classList.remove('!opacity-0', '!pointer-events-none'); navBackBtn.setAttribute('onclick', 'window.appBot.goBack()');
                this.currentFlow = flowType;
                
                if (flowType === 'schedule') await this.showScheduleStep1();
                else if (flowType === 'emergency') await this.showEmergencyStep1();
                else if (flowType === 'reschedule') await this.showRescheduleFlow();
                else if (flowType === 'call') await this.showCallFlow();
                else if (flowType === 'question') await this.showQuestionForm();
                else if (flowType === 'reviews') await this.showReviewsFlow();
            },

            showScheduleStep1: async function() {
                chatHeaderTitle.innerText = "Schedule Appointment"; stepIndicator.innerText = "Step 1 of 4"; navBackBtn.setAttribute('onclick', 'window.appBot.goBack()');
                await appendBotMessageWithTyping("Great! I can help you request an appointment. Are you a new or returning patient?", 1200); await wait(400);
                const opts = ['New Patient', 'Returning Patient'];
                appendOptions('schedule-opts-1', `<div class="!flex !gap-2 !w-[90%] !flex-wrap !mb-2 !pl-[38px]">${opts.map(opt => `<button type="button" onclick="window.appBot.handleScheduleStep('patient_type', '${opt}')" class="!w-auto !bg-white !border !border-[#0f57bc]/30 !rounded-full !py-1.5 !px-4 !text-[13px] !font-medium !text-[#0f57bc] hover:!bg-slate-50 !transition-colors !shadow-sm active:!scale-95 !text-center !cursor-pointer">${opt}</button>`).join('')}</div>`);
            },
            handleScheduleStep: async function(field, value) {
                window.pdaBotState.schedule[field] = value;
                const cid = field === 'patient_type' ? 'schedule-opts-1' : field === 'reason' ? 'schedule-opts-2' : 'schedule-opts-3';
                if(document.getElementById(cid)) document.getElementById(cid).remove();
                appendUserMessage(value); await wait(400);
                if (field === 'patient_type') await this.showScheduleStep2();
                else if (field === 'reason') {
                    if (value === 'Other') await this.askForOtherReason();
                    else await this.showScheduleStep3();
                }
                else if (field === 'best_time') await this.showScheduleStep4();
            },
            showScheduleStep2: async function() {
                stepIndicator.innerText = "Step 2 of 4"; navBackBtn.setAttribute('onclick', 'window.appBot.goBack()');
                await appendBotMessageWithTyping("Got it. What is the main reason for your visit?", 1000); await wait(600);
                
                const topProcedures = ['Checkup & Cleaning', 'Tooth Pain / Emergency', 'Teeth Whitening', 'Invisalign', 'Cosmetic Consultation', 'Other'];

                let html = `<div class="!flex !gap-2 !w-[90%] !flex-wrap !mb-2 !pl-[38px]">`;
                topProcedures.forEach(opt => {
                    html += `<button type="button" onclick="window.appBot.handleScheduleStep('reason', '${opt}')" class="!w-auto !bg-white !border !border-[#0f57bc]/30 !rounded-full !py-1.5 !px-4 !text-[13px] !font-medium !text-[#0f57bc] hover:!bg-slate-50 !transition-colors !shadow-sm active:!scale-95 !text-center !cursor-pointer">${opt}</button>`;
                });
                html += `</div>`;
                appendOptions('schedule-opts-2', html);
            },
            askForOtherReason: async function() {
                await appendBotMessageWithTyping("Could you briefly describe the reason for your visit?", 1000); await wait(600);
                let html = `<div id="schedule-opts-other" class="!w-[90%] !pl-[38px] !mt-1 !shrink-0">
                    <form onsubmit="event.preventDefault(); window.appBot.handleOtherReasonSubmit(this);" class="!flex !gap-2 !w-full !m-0 !p-0 !relative">
                        <input type="text" name="other_reason" placeholder="Type your reason..." required autocomplete="off" class="!w-full !bg-white !border !border-[#0f57bc]/30 !text-[13.5px] !rounded-full !py-2.5 !pl-4 !pr-12 focus:!outline-none focus:!border-[#0f57bc] focus:!ring-2 focus:!ring-[#0f57bc]/10 !transition-all !text-slate-700 !shadow-sm !m-0">
                        <button type="submit" class="!absolute !right-1 !top-1 !bottom-1 !p-2 !bg-[#0f57bc] !text-white !rounded-full hover:!bg-[#0d4a9f] hover:!scale-105 active:!scale-95 !transition-all !shadow-sm !flex !items-center !justify-center !m-0">
                            <i data-lucide="arrow-right" class="!w-3.5 !h-3.5"></i>
                        </button>
                    </form>
                </div>`;
                appendOptions('schedule-opts-other-container', html);
            },
            handleOtherReasonSubmit: async function(form) {
                const fd = new FormData(form); const reason = fd.get('other_reason');
                if(!reason) return;
                window.pdaBotState.schedule.reason = 'Other'; window.pdaBotState.schedule.other_reason = reason;
                if(document.getElementById('schedule-opts-other-container')) document.getElementById('schedule-opts-other-container').remove();
                appendUserMessage(reason); await wait(400); await this.showScheduleStep3();
            },
            showScheduleStep3: async function() {
                stepIndicator.innerText = "Step 3 of 4"; navBackBtn.setAttribute('onclick', 'window.appBot.goBack()');
                await appendBotMessageWithTyping("When do you prefer to come in?", 1000); await wait(600);
                const opts = ['Morning', 'Afternoon', 'Next Available'];
                appendOptions('schedule-opts-3', `<div class="!flex !gap-2 !w-[90%] !flex-wrap !mb-2 !pl-[38px]">${opts.map(opt => `<button type="button" onclick="window.appBot.handleScheduleStep('best_time', '${opt}')" class="!w-auto !bg-white !border !border-[#0f57bc]/30 !rounded-full !py-1.5 !px-4 !text-[13px] !font-medium !text-[#0f57bc] hover:!bg-slate-50 !transition-colors !shadow-sm active:!scale-95 !text-center !cursor-pointer">${opt}</button>`).join('')}</div>`);
            },
            showScheduleStep4: async function() {
                stepIndicator.innerText = "Step 4 of 4"; navBackBtn.setAttribute('onclick', 'window.appBot.goBack()');
                await appendBotMessageWithTyping("Perfect. Please enter your contact information and our scheduling team will reach out to confirm your exact time.", 1200); await wait(800);
                
                // Get the input value securely when creating the HTML
                const currentName = getSavedFirstName() || '';
                
                chatHistory.insertAdjacentHTML('beforeend', `<div class="!flex !flex-col !items-center !w-full animate-message !mt-3 !shrink-0" id="schedule-form-4"><form onsubmit="event.preventDefault(); window.appBot.submitSchedule(this);" class="!w-full !bg-white !border !border-slate-100 !p-4 !rounded-2xl !shadow-card !m-0"><input type="text" name="name" placeholder="Full Name" required class="chat-input-field" value="${currentName}"/><input type="tel" name="phone" placeholder="Phone Number" required class="chat-input-field"/><input type="email" name="email" placeholder="Email Address (Optional)" class="chat-input-field !mb-2"/><button type="submit" class="!w-full !bg-[#0f57bc] !text-white !font-bold !py-3.5 !rounded-xl hover:!bg-[#0d4a9f] !transition-colors active:!scale-95 !border-none !outline-none focus:!outline-none !cursor-pointer !m-0 !mt-2">Request Appointment</button></form></div>`);
                if (typeof lucide !== 'undefined' && lucide.createIcons) { lucide.createIcons(); }
                this.updateScrollArrow();
                setTimeout(() => { const hist = document.getElementById('chat-history'); if(hist) { hist.scrollTo({top: hist.scrollHeight, behavior: 'smooth'}); window.appBot.updateScrollArrow(); } }, 1500);
            },

            showEmergencyStep1: async function() {
                chatHeaderTitle.innerText = "Dental Emergency"; stepIndicator.innerText = "Step 1 of 2"; navBackBtn.setAttribute('onclick', 'window.appBot.goBack()');
                await appendBotMessageWithTyping("I'm sorry to hear you're experiencing a dental emergency. What are your main symptoms?", 1200); await wait(400);
                const opts = ['Severe Pain', 'Swelling / Infection', 'Broken Tooth', 'Other Urgent Issue'];
                appendOptions('emergency-opts-1', `<div class="!flex !gap-2 !w-[90%] !flex-wrap !mb-2 !pl-[38px]">${opts.map(opt => `<button type="button" onclick="window.appBot.handleEmergencyStep('${opt}')" class="!w-auto !bg-white !border !border-red-200 !rounded-full !py-1.5 !px-4 !text-[13px] !font-medium !text-red-700 hover:!bg-red-50 !transition-colors !shadow-sm active:!scale-95 !text-center !cursor-pointer">${opt}</button>`).join('')}</div>`);
            },
            handleEmergencyStep: async function(value) {
                window.pdaBotState.emergency.symptom = value;
                if(document.getElementById('emergency-opts-1')) document.getElementById('emergency-opts-1').remove();
                appendUserMessage(value); await wait(400);
                
                stepIndicator.innerText = "Step 2 of 2"; navBackBtn.setAttribute('onclick', 'window.appBot.goBack()');
                await appendBotMessageWithTyping("We prioritize emergencies. Please provide your name and phone number so we can reach you right away to get you in.", 1200); await wait(800);
                
                const currentName = getSavedFirstName() || '';
                
                chatHistory.insertAdjacentHTML('beforeend', `<div class="!flex !flex-col !items-center !w-full animate-message !mt-3 !shrink-0" id="emergency-form-2"><form onsubmit="event.preventDefault(); window.appBot.submitEmergency(this);" class="!w-full !bg-[#fff4f4] !border !border-[#ffdede] !p-4 !rounded-2xl !shadow-card !m-0"><input type="text" name="name" placeholder="Full Name" required class="chat-input-field" value="${currentName}"/><input type="tel" name="phone" placeholder="Phone Number" required class="chat-input-field"/><button type="submit" class="!w-full !bg-[#d92d20] !text-white !font-bold !py-3.5 !rounded-xl hover:!bg-red-700 !transition-colors active:!scale-95 !mt-2 !border-none !outline-none focus:!outline-none !cursor-pointer !m-0">Request Urgent Help</button></form></div>`);
                this.updateScrollArrow();
                setTimeout(() => { const hist = document.getElementById('chat-history'); if(hist) { hist.scrollTo({top: hist.scrollHeight, behavior: 'smooth'}); window.appBot.updateScrollArrow(); } }, 1500);
            },

            showRescheduleFlow: async function() {
                chatHeaderTitle.innerText = "Reschedule"; stepIndicator.innerText = "Step 1 of 1"; navBackBtn.setAttribute('onclick', 'window.appBot.goBack()');
                await appendBotMessageWithTyping("We can help you reschedule. Please provide your details and when you'd like to move your appointment to.", 1200); await wait(800);
                
                const currentName = getSavedFirstName() || '';
                
                chatHistory.insertAdjacentHTML('beforeend', `<div class="!flex !flex-col !items-center !w-full animate-message !mt-3 !shrink-0" id="reschedule-form"><form onsubmit="event.preventDefault(); window.appBot.submitReschedule(this);" class="!w-full !bg-white !border !border-slate-100 !p-4 !rounded-2xl !shadow-card !m-0"><input type="text" name="name" placeholder="Full Name" required class="chat-input-field" value="${currentName}"/><input type="tel" name="phone" placeholder="Phone Number" required class="chat-input-field"/><textarea name="requested_time" placeholder="Requested new date & time" required class="chat-input-field !resize-none !h-20"></textarea><button type="submit" class="!w-full !bg-[#0f57bc] !text-white !font-bold !py-3.5 !rounded-xl hover:!bg-[#0d4a9f] !transition-colors active:!scale-95 !mt-2 !border-none !outline-none focus:!outline-none !cursor-pointer !m-0">Request Reschedule</button></form></div>`);
                this.updateScrollArrow();
                setTimeout(() => { const hist = document.getElementById('chat-history'); if(hist) { hist.scrollTo({top: hist.scrollHeight, behavior: 'smooth'}); window.appBot.updateScrollArrow(); } }, 1500);
            },

            showCallFlow: async function() {
                chatHeaderTitle.innerText = "Call Us"; stepIndicator.classList.add('!opacity-0');
                await appendBotMessageWithTyping("Need immediate assistance? You can reach our front desk right now by calling the office.", 1000); await wait(500);
                
                appendOptions('call-opts', `<a href="tel:+1234567890" class="!w-full !bg-[#0f57bc] !text-white hover:!bg-[#0d4a9f] !px-4 !py-3.5 !rounded-[12px] !text-[13.5px] !font-bold !transition-all !shadow-sm !mb-2.5 active:!scale-95 !flex !items-center !justify-center !gap-2 !outline-none focus:!outline-none !cursor-pointer !m-0 !no-underline"><i data-lucide="phone" class="!w-4 !h-4"></i> Call Office Now</a>`);
            },

            showQuestionForm: async function() {
                chatHeaderTitle.innerText = "Live Chat"; stepIndicator.classList.add('!opacity-0');
                document.getElementById('hipaa-footer').style.display = 'none'; document.getElementById('chat-input-area').style.setProperty('display', 'flex', 'important');
                await appendBotMessageWithTyping("Hi there! I'm Zoey, the AI assistant for the practice. What questions can I answer for you today?", 1200);
                setTimeout(() => document.getElementById('live-chat-input').focus(), 100);
            },
            
            handleChatSend: async function() {
                const inputEl = document.getElementById('live-chat-input'); const submitBtn = document.getElementById('live-chat-submit');
                const message = inputEl.value.trim(); if (!message) return;
                inputEl.value = ''; submitBtn.disabled = true; inputEl.disabled = true; appendUserMessage(message); const typingId = showTypingIndicator();
                try {
                    const controller = new AbortController(); const timeoutId = setTimeout(() => controller.abort(), 15000); 
                    const res = await fetch(QUESTION_WEBHOOK_URL, { 
                        method: 'POST', 
                        headers: { 'Content-Type': 'application/json' }, 
                        body: JSON.stringify({ message: message, name: localStorage.getItem('pdaBotName') || '', phone: '', email: '', visitorId: getChatVisitorId(), sessionId: getChatSessionId(), eventId: createTrackingId('question'), source: 'Website Chatbot - Ask a Question', pageUrl: window.location.href, pageTitle: document.title || '', referrer: document.referrer || '', userAgent: navigator.userAgent || '', timestamp: new Date().toISOString() }), 
                        signal: controller.signal 
                    });
                    clearTimeout(timeoutId); 
                    
                    if (!res.ok) throw new Error('Network response was not ok');
                    
                    const rawText = await res.text();
                    let data;
                    try { data = JSON.parse(rawText); } catch(e) { data = { reply: rawText }; }
                    removeTypingIndicator(typingId);
                    
                    let botReply = '';
                    if (typeof data === 'string') { botReply = data; }
                    else if (Array.isArray(data) && data.length > 0) { botReply = data[0].reply || data[0].message || data[0].text || data[0].output || data[0].response; }
                    else if (typeof data === 'object') { botReply = data.reply || data.message || data.text || data.response || data.output || data.answer; }

                    if (botReply) { 
                        appendBotMessage(String(botReply).replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong class="!font-bold !text-[#0f57bc]">$1</strong>')); 
                    } else { 
                        console.warn("Could not find standard text keys in n8n response:", data);
                        appendBotMessage("⚠️ **Developer Notice:** Ensure your n8n response node returns JSON with a `reply` key, e.g., `{\"reply\": \"Your message here\"}`."); 
                    }
                } catch (error) { 
                    removeTypingIndicator(typingId); 
                    console.error("Webhook Fetch Error:", error); 
                    
                    // Patient-Friendly Fallback
                    appendBotMessage("I'm currently having trouble connecting to the server to answer your question. Please try again in a moment, or you can call us directly for immediate assistance.");
                    
                    // Quick Call-to-action to help them
                    setTimeout(() => {
                        appendOptions('chat-error-opts', `<a href="tel:+1234567890" class="!w-full !bg-[#0f57bc] !text-white hover:!bg-[#0d4a9f] !px-4 !py-3 !rounded-xl !text-[13px] !font-bold !transition-all !shadow-sm !mb-2.5 active:!scale-95 !flex !items-center !justify-center !gap-2 !outline-none focus:!outline-none !cursor-pointer !m-0 !no-underline"><i data-lucide="phone" class="!w-4 !h-4"></i> Call Office Now</a>`);
                    }, 1000);

                } finally { 
                    submitBtn.disabled = false; inputEl.disabled = false; inputEl.focus(); 
                    if (typeof lucide !== 'undefined' && lucide.createIcons) { lucide.createIcons(); } 
                }
            },

            showReviewsFlow: async function() {
                chatHeaderTitle.innerText = "Patient Reviews"; stepIndicator.classList.add('!opacity-0');
                await appendBotMessageWithTyping("Our patients love us! We take pride in offering gentle, comprehensive care. Here is what people are saying:", 1200);
                
                const rData = [
                    { name: "Raina Kavangal", time: "a month ago", text: "Had a really positive experience with Dr. Aryan. He is super nice, very knowledgeable, and you can tell he genuinely cares. He takes the time to explain everything and is very thorough with every treatment and cleaning." },
                    { name: "Fiona Hannan", time: "6 months ago", text: "In a healthcare system that often feels to ironically lack compassion and care, Dr. Aryan's office was a lighthouse amongst the many negative experiences I have had at doctor's offices. The environment was welcoming..." },
                    { name: "Jake Stout", time: "a month ago", text: "Dr aryan is amazing! Very laidback and shares lots of knowledge about your particular situation... Made me feel heard and like I was in good hands. Highly recommend!!" },
                    { name: "Borzoo TabiB", time: "6 months ago", text: "I usually don’t write reviews, but this time I really wanted to share my amazing experience. I had an excellent experience with Dr. Mehdi and his team for my dental cleaning. From the moment I walked in, the office was welcoming..." }
                ];
                let html = `<div class="!relative !w-[calc(100%+2.5rem)] !-ml-5 !px-5 !mt-2 !shrink-0 group !m-0"><div id="reviews-scroll-wrapper" class="!flex !overflow-x-auto !gap-3 !pb-4 !pt-1 !snap-x !snap-mandatory hide-scrollbar">`;
                const starSVG = `<svg class="!w-3.5 !h-3.5 !fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`;
                const stars = `<div class="!flex !gap-0.5 !mb-2 !text-[#fbbc05]">${starSVG}${starSVG}${starSVG}${starSVG}${starSVG}</div>`;
                
                rData.forEach(r => { 
                    html += `<div class="!snap-center !shrink-0 !w-[260px] !bg-white !border !border-slate-200 !shadow-sm !rounded-2xl !p-4 !flex !flex-col !m-0">
                        <div class="!flex !justify-between !items-start !mb-1.5">
                            <div class="!flex !flex-col">
                                <span class="!font-bold !text-slate-800 !text-[13.5px] !m-0 !leading-tight">${r.name}</span>
                                <span class="!text-slate-400 !text-[10.5px] !m-0 !mt-0.5">${r.time}</span>
                            </div>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" class="!w-4 !h-4 !object-contain !shrink-0">
                        </div>
                        ${stars}
                        <p class="!text-[12.5px] !text-slate-600 !leading-relaxed !italic !flex-1 !m-0">"${r.text}"</p>
                    </div>`; 
                });
                html += `</div></div>`;
                chatHistory.insertAdjacentHTML('beforeend', html); await wait(1500);
                appendOptions('review-opts', `<button type="button" onclick="window.appBot.startFlow('schedule')" class="!w-full !bg-[#0f57bc] !text-white hover:!bg-[#0d4a9f] !px-4 !py-3.5 !rounded-[12px] !text-[13.5px] !font-bold !transition-all !shadow-sm !mb-2.5 active:!scale-95 !flex !items-center !justify-center !gap-2 !m-0">Schedule An Appointment</button>`);
            },

            getBasePayload: function(source) {
                return { 
                    source: source,
                    name: '', phone: '', email: '', 
                    patient_type: '', reason: '', best_time: '', 
                    emergency_symptom: '', requested_time: '',
                    visitorId: getChatVisitorId(), 
                    sessionId: getChatSessionId(), 
                    submissionId: createTrackingId('submission'), 
                    pageUrl: window.location.href, 
                    pageTitle: document.title || '', 
                    referrer: document.referrer || '', 
                    userAgent: navigator.userAgent || '', 
                    timestamp: new Date().toISOString() 
                };
            },
            submitSchedule: async function(form) {
                const fd = new FormData(form); const state = window.pdaBotState.schedule; const payload = this.getBasePayload('Schedule An Appointment');
                payload.patient_type = state.patient_type; 
                payload.reason = state.reason === 'Other' ? `Other: ${state.other_reason}` : state.reason; 
                payload.best_time = state.best_time; 
                payload.name = fd.get('name') || ''; payload.phone = fd.get('phone') || ''; payload.email = fd.get('email') || '';
                
                if (payload.name) localStorage.setItem('pdaBotName', payload.name); 
                form.parentElement.remove(); appendUserMessage(`${payload.name} • ${payload.phone}`); 
                await this.processSubmission(payload, 'Schedule');
            },
            submitEmergency: async function(form) {
                const fd = new FormData(form); const state = window.pdaBotState.emergency; const payload = this.getBasePayload('Dental Emergency');
                payload.emergency_symptom = state.symptom; 
                payload.name = fd.get('name') || ''; payload.phone = fd.get('phone') || '';
                
                if (payload.name) localStorage.setItem('pdaBotName', payload.name); 
                form.parentElement.remove(); appendUserMessage(`${payload.name} • ${payload.phone}`); 
                await this.processSubmission(payload, 'Emergency');
            },
            submitReschedule: async function(form) {
                const fd = new FormData(form); const payload = this.getBasePayload('Reschedule Appointment');
                payload.requested_time = fd.get('requested_time') || ''; 
                payload.name = fd.get('name') || ''; payload.phone = fd.get('phone') || '';
                
                if (payload.name) localStorage.setItem('pdaBotName', payload.name); 
                form.parentElement.remove(); appendUserMessage(`${payload.name} • ${payload.phone}`); 
                await this.processSubmission(payload, 'Reschedule');
            },
            processSubmission: async function(payload, type) {
                stepIndicator.innerText = "Sending..."; navBackBtn.classList.add('!opacity-0', '!pointer-events-none');
                try {
                    const response = await fetch(WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
                    if (!response.ok) throw new Error('Network error'); 
                    stepIndicator.innerText = "Done"; 
                    this.showConfirmation(type);
                } catch (e) { 
                    console.error("Webhook Fetch Error:", e); 
                    stepIndicator.innerText = "Error"; 
                    
                    // Fallback success UI for testing without a working webhook
                    // this.showConfirmation(type); 
                    
                    chatHistory.insertAdjacentHTML('beforeend', `<div class="!flex !gap-2.5 !w-[95%] animate-message !shrink-0 !m-0">${getBotAvatarHTML()}<div class="!bg-white !border !border-red-100 !rounded-2xl !rounded-tl-sm !p-5 !shadow-card !w-full !m-0"><div class="!flex !items-center !gap-3 !mb-3 !m-0"><div class="!bg-red-50 !text-red-600 !p-2 !rounded-full !m-0"><i data-lucide="alert-circle" class="!w-4 !h-4"></i></div><h4 class="!font-bold !text-slate-800 !text-[15px] !m-0">Connection Error</h4></div><p class="!text-[13px] !text-slate-600 !leading-relaxed !font-medium !mb-4 !m-0">We are currently having trouble sending your request. Please try calling the office directly.</p><button type="button" onclick="window.appBot.goBack()" class="!w-full !bg-slate-100 !text-slate-700 !font-bold !py-3 !rounded-xl hover:!bg-slate-200 !transition-colors !text-[13px] !border-none !outline-none focus:!outline-none !cursor-pointer !m-0">Back to Main Menu</button></div></div>`);
                    if (typeof lucide !== 'undefined' && lucide.createIcons) { lucide.createIcons(); }
                    setTimeout(() => {chatHistory.scrollTo({top: chatHistory.scrollHeight, behavior: 'smooth'}); window.appBot.updateScrollArrow();}, 50);
                }
            },
            showConfirmation: function(type) {
                setTimeout(() => {
                    let confirmText = "We received your request and just sent a text message to the phone number you provided. We will be in touch shortly!";
                    if (type === 'Emergency') confirmText = "We received your urgent request. We will review it immediately and reach out to get you scheduled as soon as possible.";
                    
                    chatHistory.insertAdjacentHTML('beforeend', `<div class="!flex !gap-2.5 !w-[95%] animate-message !shrink-0 !m-0">${getBotAvatarHTML()}<div class="!bg-white !border !border-slate-100 !rounded-2xl !rounded-tl-sm !p-5 !shadow-card !w-full !m-0"><div class="!flex !items-center !gap-3 !mb-3 !m-0"><div class="!bg-[#0f57bc]/20 !text-[#0f57bc] !p-2 !rounded-full !m-0"><i data-lucide="check" class="!w-4 !h-4"></i></div><h4 class="!font-bold !text-slate-800 !text-[15px] !m-0">Success!</h4></div><p class="!text-[13px] !text-slate-600 !leading-relaxed !font-medium !mb-4 !m-0">${confirmText}</p><button type="button" onclick="window.appBot.goBack()" class="!w-full !bg-slate-100 !text-slate-700 !font-bold !py-3 !rounded-xl hover:!bg-slate-200 !transition-colors !text-[13px] !border-none !outline-none focus:!outline-none !cursor-pointer !m-0">Back to Main Menu</button></div></div>`);
                    
                    window.pdaBotState = { schedule: { patient_type: '', reason: '', other_reason: '', best_time: '' }, emergency: { symptom: '' }, reschedule: { current_time: '' } };
                    
                    if (typeof lucide !== 'undefined' && lucide.createIcons) { lucide.createIcons(); }
                    setTimeout(() => {chatHistory.scrollTo({top: chatHistory.scrollHeight, behavior: 'smooth'}); window.appBot.updateScrollArrow();}, 50);
                }, 500);
            }
        };
    }

    // Ensure this runs only after the DOM is fully interactive
    if (document.readyState === 'loading') { 
        document.addEventListener('DOMContentLoaded', () => {
            loadDependencies();
            injectStyles();
            injectHTML();
            initLogic();
        }); 
    } else { 
        loadDependencies();
        injectStyles();
        injectHTML();
        initLogic();
    }
})();
