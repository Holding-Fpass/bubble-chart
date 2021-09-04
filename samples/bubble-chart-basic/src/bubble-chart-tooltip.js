import { state, states, setState } from './bubble-chart-states'

export function hideTooltip()
{
    if (state == states.CONTENT_TYPE)
    {
        return;
    }

    setState(states.HASH_TAG);

    if (document.getElementById('tooltip'))
    {
        document.getElementById('tooltip').remove();
    }
}

export function showTooltip(name, timeWatchedHours, timeWatchedMinutes, timeLeftHours, timeLeftMinutes)
{
    if (state == states.CONTENT_TYPE)
    {
        return;
    }

    hideTooltip();

    setState(states.TOOLTIP);

    const newDiv = document.createElement("div");
    newDiv.id = "tooltip"
    const currentDiv = document.getElementById("tooltip");
    document.body.insertBefore(newDiv, currentDiv);
    document.getElementById('tooltip').innerHTML = `
    <section class="tooltip-name">
        <h2>${name}</h2>
        <svg id="close-tooltip" height="20px" viewBox="0 0 512 512" width="20px">
            <path fill="white"
                d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z" />
        </svg>
    </section>
    <section class="tooltip-content">
        <svg fill="none" height="46" stroke="#B43DE7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            viewBox="0 0 24 24" width="46">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 15 15" />
        </svg>
        <div class="tooltip-content-info">
            <div class="tooltip-time">
                <p class="tooltip-number">${timeWatchedHours}</p>
                <p class="tooltip-timeletter">h</p>
                <p class="tooltip-number">${timeWatchedMinutes}</p>
                <p class="tooltip-timeletter">min</p>
            </div>
            <p>de conteúdo estudado</p>
        </div>
    </section>
    <span class="tooltip-line"></span>
    <section class="tooltip-content">
        <svg fill="none" height="46" stroke="#BBBBBB" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            viewBox="0 0 24 24" width="46">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 15 15" />
        </svg>
        <div class="tooltip-content-info">
            <div class="tooltip-time">
                <p class="tooltip-plus">+</p>
                <p class="tooltip-number">${timeLeftHours}</p>
                <p class="tooltip-timeletter">h</p>
                <p class="tooltip-number">${timeLeftMinutes}</p>
                <p class="tooltip-timeletter">min</p>
            </div>
            <p>ao completar os conteúdos adquiridos</p>
        </div>
    </section>`;
}
