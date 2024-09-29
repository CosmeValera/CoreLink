import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { expect, describe, it, afterEach, vi } from 'vitest'
import InputActive from '../src/shared/InputActive'
import StmTcpIpTable from '../src/shared/StmTcpIpTable'
import SwitchEnable from '../src/shared/SwitchEnable'

describe('Shared components:', () => {
  describe('Input Active', () => {
    afterEach(cleanup)

    it('should render', () => {
      render(<InputActive />)
    })

    it('should render title correctly', () => {
      render(<InputActive name='Test' />)

      screen.getByText('Test')
    })

    it('should render status name and status correctly when active', () => {
      render(<InputActive name='Test' status loading={false} />)

      screen.getByText('ACTIVE')
    })

    it('should render status name and status correctly when inactive', () => {
      render(<InputActive name='Test' status={false} loading={false} />)

      screen.getByText('INACTIVE')
    })
  })

  describe('StmTcpIpTable', () => {
    afterEach(cleanup)

    const getTestTable = (value) => {
      const testTable = [
        {
          STM_GCC1_BACKUP_MKMF_CONNECTION_STATUS: value
        },
        {
          STM_GCC1_BACKUP_PKMF_CONNECTION_STATUS: value
        },
        {
          STM_GCC1_BACKUP_SKMF_CONNECTION_STATUS: value
        },
        {
          STM_GCC1_PRIME_MKMF_CONNECTION_STATUS: value
        },
        {
          STM_GCC1_PRIME_PKMF_CONNECTION_STATUS: value
        },
        {
          STM_GCC1_PRIME_SKMF_CONNECTION_STATUS: value
        },
        {
          STM_GCC2_BACKUP_MKMF_CONNECTION_STATUS: value
        },
        {
          STM_GCC2_BACKUP_PKMF_CONNECTION_STATUS: value
        },
        {
          STM_GCC2_BACKUP_SKMF_CONNECTION_STATUS: value
        },
        {
          STM_GCC2_PRIME_MKMF_CONNECTION_STATUS: value
        },
        {
          STM_GCC2_PRIME_PKMF_CONNECTION_STATUS: value
        },
        {
          STM_GCC2_PRIME_SKMF_CONNECTION_STATUS: value
        }
      ]

      return testTable
    }

    it('should render', () => {
      render(<StmTcpIpTable />)
    })

    it('should render with KMF names', () => {
      render(<StmTcpIpTable />)
      screen.getByText('M-KMF')
      screen.getByText('P-KMF')
      screen.getByText('GCS-KMF')
    })

    it('should render with Chain names', () => {
      render(<StmTcpIpTable />)
      screen.getByText('GCC-1 Prime')
      screen.getByText('GCC-2 Prime')
      screen.getByText('GCC-1 Backup')
      screen.getByText('GCC-2 Backup')
    })

    it('should render with all disconnected', () => {
      render(<StmTcpIpTable configuration={getTestTable(false)} />)
      screen.getAllByText('DISCONNECTED')
    })

    it('should render with all connected', () => {
      render(<StmTcpIpTable configuration={getTestTable(true)} />)
      screen.getAllByText('CONNECTED')
    })

    it('should render "No Data"', () => {
      render(<StmTcpIpTable configuration={[]} />)
      screen.getAllByText('No Data')
    })
  })

  describe('SwitchEnable', () => {
    afterEach(cleanup)

    it('should render', () => {
      render(<SwitchEnable />)
    })

    it('should render Name', () => {
      render(<SwitchEnable configuration='Test' />)
      screen.getAllByText('Test')
    })

    it('should render checked', () => {
      const { getByRole } = render(<SwitchEnable configuration='Test' checked />)
      const inputSwitch = getByRole('checkbox', { checked: true })

      expect(inputSwitch).toBeTruthy()
    })

    it('should render unchecked', () => {
      const { getByRole } = render(<SwitchEnable configuration='Test' checked={false} />)
      const inputSwitch = getByRole('checkbox', { checked: false })

      expect(inputSwitch).toBeTruthy()
    })

    it('renders error state', () => {
      const { container } = render(<SwitchEnable configuration='Test' checked={false} error />)
      expect(container.getElementsByClassName('fadeinright')).toHaveLength(1)
    })

    it('invokes callback functions on switch change and confirmation', async () => {
      const callbackPatch = vi.fn().mockResolvedValue(true)
      const onToggle = vi.fn()

      render(
        <SwitchEnable
          configuration='Test'
          configurationApi='Test-API'
          checked={false}
          callbackPatch={callbackPatch}
          onToggle={onToggle}
        />
      )

      const switchInput = screen.getByRole('switch')

      // Simulate user toggling the switch
      fireEvent.click(switchInput)

      // Confirm the switch change
      const confirmButton = await screen.findByRole('button', { name: 'Yes' })
      fireEvent.click(confirmButton)

      // Check if callback functions were called with the correct parameters
      expect(callbackPatch).toHaveBeenCalledWith('Test-API', 'ENABLED')
    })
  })
})
