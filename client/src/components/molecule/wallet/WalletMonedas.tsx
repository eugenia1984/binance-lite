import React, { useMemo, useState } from 'react'
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import { Order } from '../../../utils/types'
import { CoinData } from '../../../models/CoinDataResponse'
import { useApiContext } from '../../../context/FetchContext'
import { COINS_TABLE_STYLES } from '../coins-table/CoinsTableStyles'
import SellCoinModal from '../modals/BuySellCoinModal'

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) return -1
    if (b[orderBy] > a[orderBy]) return 1
    return 0
}

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
    id: keyof CoinData
    label: string
    showSmall: boolean
}

const headCells: readonly HeadCell[] = [
    { id: 'name', label: 'Criptomoneda', showSmall: true },
    { id: 'currentPrice', label: 'Último precio', showSmall: true },
    { id: 'change', label: 'Cambio en 24hs', showSmall: false },
    { id: 'marketCap', label: 'Cap. de mercado', showSmall: false },
]

interface CoinsTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof CoinData) => void
    order: Order
    orderBy: string
}

function CoinsTableHead(props: CoinsTableProps) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler =
        (property: keyof CoinData) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        }

    return (
        <TableHead>
            <TableRow sx={ COINS_TABLE_STYLES.tableRow }>
                { headCells.map((headCell) => (
                    <TableCell
                        key={ headCell.id }
                        align='left'
                        padding='normal'
                        sortDirection={ orderBy === headCell.id ? order : false }
                        sx={ {
                            display: {
                                xs: `${ headCell.showSmall ? 'inline-block' : 'none' }`,
                                sm: 'flex'
                            },
                            maxWidth: '130px'
                        } }
                    >
                        <TableSortLabel
                            active={ orderBy === headCell.id }
                            direction={ orderBy === headCell.id ? order : 'asc' }
                            onClick={ createSortHandler(headCell.id) }
                        >
                            { headCell.label }
                            { orderBy === headCell.id ? (
                                <Box component="span" sx={ visuallyHidden }>
                                    { order === 'desc' ? 'sorted descending' : 'sorted ascending' }
                                </Box>
                            ) : null }
                        </TableSortLabel>
                    </TableCell>
                )) }
            </TableRow>
        </TableHead>
    )
}

export default function CoinsTable() {
    const { coinsData } = useApiContext()
    const [order, setOrder] = useState<Order>('asc')
    const [orderBy, setOrderBy] = useState<keyof CoinData>('currentPrice')
    const [openModal, setOpenModal] = useState(false)
    const [cointToShow, setCoinToShow] = useState<CoinData>(null)

    const handleClickOpen = () => setOpenModal(true)
    const handleClose = () => setOpenModal(false)

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof CoinData,
    ) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const handleClick = (event: React.MouseEvent<unknown>, coinData: CoinData) => {
        setCoinToShow(coinData)
        handleClickOpen()
    };

    const visibleRows: any[] = useMemo(() => stableSort(coinsData, getComparator(order, orderBy)).slice(0, 3), [order, orderBy, coinsData])

    function formatNumberToCurrency(input: string): string {
        const num = parseFloat(input)
        if (isNaN(num)) return "Invalid input"

        if (num >= 1000000) {
            const millions = (num / 1000000).toFixed(2)
            return `${ millions } M$`
        } else {
            return `${ num.toFixed(2) } $`
        }
    }

    return (
        <Box sx={ { width: '100%' } }>
            <Paper sx={ { width: '100%', mb: 2 } }>
                <TableContainer>
                    <Table
                        sx={ COINS_TABLE_STYLES.table }
                        aria-labelledby="tableTitle"
                        size='medium'
                    >
                        <CoinsTableHead
                            order={ order }
                            orderBy={ orderBy }
                            onRequestSort={ handleRequestSort }
                        />
                        <TableBody>
                            { visibleRows.map((coinsData, index) => {
                                const labelId = `enhanced-table-checkbox-${ index }`
                                const itemChange: number = +(parseFloat(coinsData.change.toString()).toFixed(2))
                                const price = +(parseFloat(coinsData.currentPrice.toString()).toFixed(2))
                                const marketCap = formatNumberToCurrency(coinsData.marketCap.toString())

                                return (
                                    <TableRow
                                        hover
                                        onClick={ (event) => handleClick(event, coinsData) }
                                        role="checkbox"
                                        tabIndex={ -1 }
                                        key={ coinsData.name }
                                        sx={ COINS_TABLE_STYLES.tableRow }
                                    >
                                        <TableCell
                                            component="th"
                                            id={ labelId }
                                            scope="row"
                                            padding="none"
                                            sx={ COINS_TABLE_STYLES.tableCellName }
                                        >
                                            <Box>
                                                <img
                                                    src={ coinsData.iconUrl.toString() }
                                                    width={ 30 }
                                                    height={ 30 }
                                                    alt={ coinsData.name.toString() }
                                                />
                                            </Box>
                                            <Box component="div" sx={ COINS_TABLE_STYLES.containerIconName }>
                                                <Box component="span" sx={ COINS_TABLE_STYLES.symbol }>
                                                    { coinsData.symbol }
                                                </Box>
                                                <Box component="span" sx={ COINS_TABLE_STYLES.name }>
                                                    { coinsData.name }
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="right" sx={ COINS_TABLE_STYLES.tableCell }>
                                            { price }
                                        </TableCell>
                                        <TableCell align="right" sx={ COINS_TABLE_STYLES.tableCellChange }>
                                            <Box component="span" sx={ { color: itemChange > 0 ? '#03A66D' : '#CF304A' } }>
                                                { itemChange > 0 && '+' }{ itemChange } %
                                            </Box>
                                        </TableCell>
                                        <TableCell align="right" sx={ COINS_TABLE_STYLES.tableCellMarketCap }>
                                            { marketCap }
                                        </TableCell>
                                    </TableRow>
                                );
                            }) }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            { openModal &&
                <SellCoinModal
                    handleClose={ handleClose }
                    openModal={ openModal }
                    cointToShow={ cointToShow }
                    btnModalText='Comprar'
                    urlPathName='/buy'
                />
            }
        </Box>
    )
}

