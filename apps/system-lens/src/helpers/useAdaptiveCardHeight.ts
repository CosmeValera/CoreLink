import { useState, RefObject } from 'react';

export function useAdaptiveCardHeight(cardRef: RefObject<HTMLElement>) {
    const [parentHeight, setParentHeight] = useState<number>(0);
    const [topToolbarHeight, setTopToolbarHeight] = useState<number>(0);
    const [bottomToolbarHeight, setBottomToolbarHeight] = useState<number>(0);
    
    const updateHeightsStates = () => {
        const card = cardRef.current;
        if (card && card.children && card.children[1]) {
            const parentDiv = card.parentElement?.parentElement!;
            const topToolbar = card.querySelectorAll('.MuiPaper-root > .MuiBox-root')[0];
            const bottomToolbar = card.querySelectorAll('.MuiPaper-root > .MuiBox-root')[1];

            setParentHeight(parentDiv?.clientHeight);
            setTopToolbarHeight(topToolbar?.clientHeight);
            setBottomToolbarHeight(bottomToolbar?.clientHeight);
        }
    }

	const calculateTableContentHeight = () => {
		if (!parentHeight || !topToolbarHeight || !bottomToolbarHeight) {
            return "auto";
		}
        
        const parentDiv = cardRef.current?.parentElement?.parentElement!;
        if (parentHeight != parentDiv?.clientHeight) {
            updateHeightsStates();
        }
        
		return (parentHeight - topToolbarHeight - bottomToolbarHeight - 1) + "px";
	}

    return { updateHeightsStates, calculateTableContentHeight };
}