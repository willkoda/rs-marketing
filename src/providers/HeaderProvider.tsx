import React, {useState} from 'react';

interface Props {
    children: Array<JSX.Element> | JSX.Element;
}

interface Context {
    activeMainPageSection: ActiveLink;
    updateActiveMainPageSection(newActiveLink: ActiveLink): void;
}

type ActiveLink = 'home' | 'services' | 'contact-us';

function HeaderProvider(props: Props) {
    const [activeMainPageSection, setActiveMainPageSection] = useState<ActiveLink>('home');

    const updateActiveMainPageSection = (newActiveLink: ActiveLink) => {
        setActiveMainPageSection(newActiveLink);
    }

    const state = {
        activeMainPageSection: activeMainPageSection,
        updateActiveMainPageSection: updateActiveMainPageSection
    }

    return (
        <HeaderContext.Provider value={state}>
            {props.children}
        </HeaderContext.Provider>
    )
}

export const HeaderContext = React.createContext<Context>(null!);
export default HeaderProvider;