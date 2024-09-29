import React, { ReactNode, useState } from 'react'

import {
  Box,
  Drawer,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
} from '@mui/material'
import TooltipStyled from './TooltipStyled'

import { ReactComponent as ViewsIcon } from '../icons/gui.svg'
import { ReactComponent as PanelsIcon } from '../icons/application.svg'
import { ReactComponent as AlertsIcon } from '../icons/notification.svg'
import { ReactComponent as ArrowLeftIcon } from '../icons/arrow-left.svg'
import { ReactComponent as ChevronDown } from '../icons/chevron-down.svg'

import { useViews } from '../components/Views/ViewsProvider'
import { DefaultView, views } from '../components/Views/fixture'
import useSidebarPanels, { Panel } from '../customHooks/useSidebarPanels'
import { useLayout } from '../components/Layout/LayoutProvider'

import { ReactComponent as Logo } from '../../public/logo.svg'

import { DefineViews } from '../components/Views/fixture'

export const SIDEBAR_WIDTH = {
  COLLAPSED: 64,
  EXPANDED: 264,
}

interface SidebarListItemProps {
  text: string;
  selected?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}

interface DrawerContentsProps {
  items: (DefineViews | Panel)[];
  onClick: (item: DefaultView, ev: React.MouseEvent<HTMLLIElement>) => void;
  onDragStart?: (item: DefaultView, ev: React.DragEvent<HTMLLIElement> ) => void; 
}

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}


const SidebarListItem: React.FC<SidebarListItemProps> = ({ text, children, ...rest }) => {
  return (
    <TooltipStyled title={text} placement="right" arrow>
      <ListItem disablePadding>
        <ListItemButton
          disableRipple
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'stretch',
            height: 40,
            width: 40,
            padding: 1,
            borderRadius: 2,
            color: 'foreground.contrastPrimary',
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: 'primary.main',
            },
            '&.Mui-selected': {
              backgroundColor: 'action.hover',
            },
            '&.Mui-selected:hover': {
              backgroundColor: 'primary.main',
            },
          }}
          {...rest}
        >
          <ListItemIcon sx={{ minWidth: 'unset', color: 'inherit' }}>
            {children}
          </ListItemIcon>
        </ListItemButton>
      </ListItem>
    </TooltipStyled>
  )
}

const DrawerContents:React.FC<DrawerContentsProps> = ({ items, onClick, onDragStart }) => {
  return items.map((group) => (
    <Accordion
      key={group.name}
      disableGutters
      square
      elevation={0}
      sx={{
        backgroundColor: 'transparent',
        color: 'foreground.contrastPrimary',
        '&:before': { content: 'none' },
      }}
    >
      <AccordionSummary
        expandIcon={<ChevronDown width={20} height={20} />}
        sx={{
          p: '8px 16px',
          '& .MuiAccordionSummary-content': { m: 0 },
          '& .MuiAccordionSummary-expandIconWrapper': {
            color: 'foreground.contrastSecondary',
          },
          transition: 'none',
          '&:hover': { backgroundColor: 'action.hover' },
        }}
      >
        <Typography>{group.name}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0, pl: 0 }}>
        <List sx={{ p: 0 }}>
          {group.items.map((item) => (
            <ListItem
              key={item.name}
              sx={{
                height: 35,
                p: '4px 32px',
                cursor: 'pointer',
                '&:hover': { backgroundColor: 'action.hover' },
              }}
              draggable={Boolean(onDragStart)}
              onClick={onClick ? (ev) => onClick(item, ev) : undefined}
              onDragStart={
                onDragStart ? (ev) => {onDragStart(item, ev)} : undefined
              }
            >
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  ))
}

const SECTIONS = {
  VIEWS: 'views',
  PANELS: 'panels',
  ALERTS: 'alerts',
}

const PanelList = () => {
  const { addComponent, dragComponent } = useLayout()
  const { sidebarPanels } = useSidebarPanels()

  return (
    <DrawerContents
      items={sidebarPanels}
      onClick={addComponent}
      onDragStart={dragComponent}
    />
  )
}

const ViewList = () => {
  const { addView } = useViews()
  return <DrawerContents items={views} onClick={addView} />
}

// IDEA use mini-drawer instead?
// https://mui.com/material-ui/react-drawer/#mini-variant-drawer
const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const [section, setSection] = useState<string | null>(null)

  const onSectionClick = (s: string) => {
    if (s === section) {
      setSection(null)
      setOpen(false)
    } else {
      setSection(s)
      setOpen(true)
    }
  }

  const onClose = () => {
    setSection(null)
    setOpen(false)
  }

  return (
    <>
      <Box
        component="nav"
        sx={{
          position: 'fixed',
          zIndex: 1300, // NOTE modal
          top: 0,
          height: '100vh',
          width: SIDEBAR_WIDTH.COLLAPSED,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'background.barDark',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            height: SIDEBAR_WIDTH.COLLAPSED, // NOTE make it a square!
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            flexShrink: 0,
            alignSelf: 'stretch',
            color: 'foreground.contrastPrimary',
            borderBottom: 1,
            borderBottomColor: 'background.barMedium',
            backgroundColor: 'brand.primary',
            mb: 4,
          }}
        >
          <Logo />
        </Box>
        <List
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            p: 0,
          }}
        >
          <SidebarListItem
            text="Views"
            selected={section === SECTIONS.VIEWS}
            onClick={() => onSectionClick(SECTIONS.VIEWS)}
          >
            <ViewsIcon width={20} height={20} />
          </SidebarListItem>
          <SidebarListItem
            text="Panels"
            selected={section === SECTIONS.PANELS}
            onClick={() => onSectionClick(SECTIONS.PANELS)}
          >
            <PanelsIcon width={20} height={20} />
          </SidebarListItem>
          <SidebarListItem
            text="Alerts"
            selected={section === SECTIONS.ALERTS}
            onClick={() => onSectionClick(SECTIONS.ALERTS)}
            disabled
          >
            <AlertsIcon width={20} height={20} />
          </SidebarListItem>
        </List>
      </Box>
      <Drawer
        variant="persistent"
        elevation={0}
        open={open}
        PaperProps={{
          sx: {
            width: 200,
            left: SIDEBAR_WIDTH.COLLAPSED,
            borderRight: 0,
            backgroundColor: 'background.barMedium',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            p: '13px 16px',
            alignItems: 'center',
            alignSelf: 'stretch',
            color: 'foreground.contrastPrimary',
          }}
        >
          <Typography sx={{ flex: '1 0 0' }} variant="overline">
            {section === SECTIONS.PANELS ? 'Panels' : 'Views'}
          </Typography>
          <IconButton
            disableRipple
            disableFocusRipple
            sx={{
              color: 'foreground.contrastPrimary',
              p: 0.5,
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
            onClick={onClose}
          >
            <ArrowLeftIcon width={20} height={20} />
          </IconButton>
        </Box>
        {section === SECTIONS.PANELS ? <PanelList /> : <ViewList />}
      </Drawer>
    </>
  )
}

export default Sidebar
