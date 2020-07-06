import React, {useState} from 'react';

interface Props {
    children: Array<JSX.Element> | JSX.Element;
}

interface Context {
    activeMainPageSection: ActiveLink;
    updateActiveMainPageSection(newActiveLink: ActiveLink): void;
    clickTimeStamp: number;
}

function HeaderProvider(props: Props) {
    const [activeMainPageSection, setActiveMainPageSection] = useState<ActiveLink>(null!);
    const [clickTimeStamp, setClickTimeStamp] = useState(0);

    const updateActiveMainPageSection = (newActiveLink: ActiveLink) => {
        setActiveMainPageSection(newActiveLink);
        setClickTimeStamp(Date.now())
;    }

    const state = {
        activeMainPageSection: activeMainPageSection,
        updateActiveMainPageSection: updateActiveMainPageSection,
        clickTimeStamp: clickTimeStamp
    }

    return (
        <HeaderContext.Provider value={state}>
            {props.children}
        </HeaderContext.Provider>
    )
}

export const HeaderContext = React.createContext<Context>(null!);
export type ActiveLink = 'home' | 'services' | 'contact-us';
export default HeaderProvider;