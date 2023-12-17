import React from 'react'
import './Table.scss'

interface TableProps {
  items: any[]
  tableStructure: {
    header: string
    render: (item: any) => JSX.Element | string | number
  }[]
  actions?: {icon: JSX.Element, onClick: (item: any) => void}[]
}

const Table = ({items, tableStructure, actions}: TableProps) => {
  return (
      <div id={'table-wrapper'}>
        <table>
          <thead>
            <tr className={'table-header'}>
              {
                tableStructure.map((tableHeader: any) => (
                  <th><span>{tableHeader.header}</span></th>
                ))
              }
              {actions?.length && <th><span>Acciones</span></th>}
            </tr>
          </thead>
          <tbody>
            {
              items.map((item: any) => (
                <tr>
                  {tableStructure.map((tableHeader: any) => <td>{tableHeader.render(item)}</td>)}
                  {actions?.length &&
                    <td className={'table-actions'}>
                      {actions.map((action) => (
                        <span onClick={() => action.onClick(item)}>{action.icon}</span>
                      ))}
                    </td>
                  }
                </tr>
              ))
            }
          </tbody>
        </table>

      </div>
  )
}

export default Table
