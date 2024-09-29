import { useState, useEffect, RefObject } from 'react';

export function useAdaptiveCardHeight(cardRef: RefObject<HTMLElement>): string {
    const [parentHeight, setParentHeight] = useState<number | undefined>(0);
    const [topToolbarHeight, setTopToolbarHeight] = useState<number | undefined>(0);
    const [bottomToolbarHeight, setBottomToolbarHeight] = useState<number | undefined>(0);
    
    useEffect(() => {
        cardRefCalculate();
    });

    const cardRefCalculate = () => {
        if (cardRef.current && cardRef.current.children && cardRef.current.children[1]) {
            const cardChildren = cardRef.current.children;
            const parentDiv = cardRef.current.parentElement?.parentElement
            const topToolbar = cardChildren[1].querySelectorAll('.MuiPaper-root > .MuiBox-root')[0];
            const bottomToolbar = cardChildren[1].querySelectorAll('.MuiPaper-root > .MuiBox-root')[1];

            setParentHeight(parentDiv?.clientHeight)
            setTopToolbarHeight(topToolbar?.clientHeight)
            setBottomToolbarHeight(bottomToolbar?.clientHeight)
        }
    }

	const calculateTableContentHeight = () => {
		if (!parentHeight || !topToolbarHeight || !bottomToolbarHeight) {
			return "auto";
		}

		return (parentHeight - topToolbarHeight - bottomToolbarHeight) + "px"
	}
    return calculateTableContentHeight();
}