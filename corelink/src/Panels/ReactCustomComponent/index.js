import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  useTheme,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

import io from 'socket.io-client'

import Loading from '../Loading'

import { STATUS, DomainChip } from '../../FleetMonitoring'

import { URL, SOCKET_OPTS, MESSAGES, SESSION } from './constants'

const SEVERITY = {
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
}

const getStatusFromSeverity = (severity) => {
  switch (severity) {
    case SEVERITY.INFO:
      return STATUS.NORMAL
    case SEVERITY.WARN:
      return STATUS.CAUTION
    case SEVERITY.ERROR:
      return STATUS.CRITICAL
    default:
      return STATUS.OFF
  }
}

const HEADER_HEIGHT = 31
const ROW_HEIGHT = 41

const ReactCustomComponent = (props) => {
  const { satellites, height } = props

  const theme = useTheme()

  const [events, setEvents] = useState([])

  useEffect(() => {
    const socket = io.connect(URL, SOCKET_OPTS)

    socket.on(MESSAGES.EVENT_NEW, (msg) => {
      if (msg.success) {
        setEvents((events) => msg.events.concat(events))
      }
    })

    socket.on('connect', () => {
      console.log('Connected')
      socket.emit(MESSAGES.HANDSHAKE, SESSION, () => {
        console.log('Handshake received')
        const params = {
          limits: {
            filters: {
              page: 'events',
              customFilter: `domain:${satellites.join(',')}`,
            },
          },
        }
        socket.emit(MESSAGES.EVENTS_START, params, (response) => {
          console.log('huh', response)
          if (response.success) setEvents(response.result.data)
        })
      })
    })

    return () => socket.disconnect()
  }, []) // NOTE ignore this warning as satellites cannot change in a view

  if (events.length === 0) {
    return <Loading />
  }

  const maximumEvents = Math.floor((height - HEADER_HEIGHT) / ROW_HEIGHT)

  return (
    <TableContainer
      sx={{
        overflow: 'hidden',
        textWrap: 'nowrap',
        '& .MuiTableCell-root': theme.typography.monospace2,
      }}
    >
      <Table sx={{ minWidth: 650 }} size="small" aria-label="Doamin events">
        <TableHead>
          <TableRow>
            <TableCell>Severity</TableCell>
            <TableCell>Domain</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Site</TableCell>
            <TableCell>Instance</TableCell>
            <TableCell>Ground System</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.slice(0, maximumEvents).map((event) => {
            const status = getStatusFromSeverity(event.sev)
            return (
              <TableRow key={event.id}>
                <TableCell sx={{ pr: 4 }}>
                  <Box sx={{ maxWidth: 50 }}>
                    <DomainChip status={status} />
                  </Box>
                </TableCell>
                <TableCell>{event.d}</TableCell>
                <TableCell sx={{ minWidth: '29ch' }}>{event.utc}</TableCell>
                <TableCell>{event.s}</TableCell>
                <TableCell>{event.i}</TableCell>
                <TableCell>{event.gs}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

ReactCustomComponent.propTypes = {
  height: PropTypes.number.isRequired,
  satellites: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default ReactCustomComponent
