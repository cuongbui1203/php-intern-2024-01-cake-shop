require('./bootstrap');

import React from 'react';
import { render } from 'react-dom';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { CookiesProvider } from 'react-cookie';
import { InertiaProgress } from '@inertiajs/progress';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import {
    AdminNotificationProvider,
    NotificationProvider
} from './Components/Notification';

const appName =
    window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => require(`./Pages/${name}`),
    setup({ el, App, props }) {
        return render(
            <AdminNotificationProvider auth={props.initialPage.props.auth}>
                <NotificationProvider>
                    <CookiesProvider>
                        <I18nextProvider i18n={i18n}>
                            <App {...props} />
                        </I18nextProvider>
                    </CookiesProvider>
                </NotificationProvider>
            </AdminNotificationProvider>,
            el
        );
    }
});

InertiaProgress.init({ color: '#4B5563' });
