export const GA_TRACKING_ID = 'AW-17540952354';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: URL) => {
    window.gtag('config', GA_TRACKING_ID, {
        page_path: url,
    });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: { action: string; category: string; label: string; value: number }) => {
    window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
    });
};

type GTagEvent = {
    action: string;
    category: string;
    label: string;
    value: number;
};

export const gtag_report_conversion = (url?: string) => {
    const callback = () => {
        if (typeof url !== 'undefined') {
            window.location.href = url;
        }
    };

    if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'conversion', {
            'send_to': 'AW-17540952354/jcJYCIHcw8UbEKLilqxB',
            'event_callback': callback
        });
    } else {
        // If gtag is not loaded, just execute the callback
        callback();
    }
    return false;
}

// Declare the gtag function on the window object
declare global {
    interface Window {
        gtag: (
            option: string,
            gaTrackingId: string,
            options: Record<string, unknown>
        ) => void;
    }
}
