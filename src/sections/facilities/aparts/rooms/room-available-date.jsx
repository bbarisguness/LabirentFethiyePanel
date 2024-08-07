/* eslint-disable prettier/prettier */
// material-ui
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Loader from 'components/Loader';

// project-imports
import MainCard from 'components/MainCard';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { GetAvailibleDateRoom } from 'services/reservationServices';
import { dateToString, days } from 'utils/custom/dateHelpers';

export const header = [
  { label: 'Başlangıç Tarihi', key: 'name' },
  { label: 'Bitiş Tarihi', key: 'calories' },
  { label: 'Fiyat', key: 'fat' }
];

// ==============================|| MUI TABLE - BASIC ||============================== //

export default function RoomAvailableDateSection() {
  const params = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  let today = new Date();

  useEffect(() => {
    setLoading(false);
    GetAvailibleDateRoom(params.id).then((res) => { setData(res.data); setLoading(false); })
  }, [])

  if (loading) return (<Loader open={loading} />)
  return (
    <MainCard content={false} title="MÜSAİT TARİHLER">
      <TableContainer>
        <Table sx={{ minWidth: 350 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Giriş Tarihi</TableCell>
              <TableCell align="left">Çıkış Tarihi</TableCell>
              <TableCell align="left">Gece</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {data &&
              (data.length > 0 ? (
                data.map((item, index) => {
                  if (
                    days(
                      item.attributes.checkOut,
                      data[index + 1] != null
                        ? data[index + 1].attributes.checkIn
                        : new Date(item.attributes.checkOut).getFullYear().toString() + '-12-31'
                    ) > 0
                  ) {
                    if (data[index + 1] != null) {
                      return (
                        <TableRow hover key={index}>
                          <TableCell align="left">{item.attributes.checkOut}</TableCell>
                          <TableCell align="left">{data[index + 1].attributes.checkIn}</TableCell>
                          <TableCell align="left">
                            {days(item.attributes.checkOut, data[index + 1].attributes.checkIn)} Gece
                          </TableCell>
                        </TableRow>
                      );
                    } else {
                      return (
                        <TableRow hover key={index}>
                          <TableCell align="left">{item.attributes.checkOut}</TableCell>
                          <TableCell align="left">
                            {new Date(item.attributes.checkOut).getFullYear().toString() + '-12-31'}
                          </TableCell>
                          <TableCell align="left">
                            {days(item.attributes.checkOut, new Date(item.attributes.checkOut).getFullYear().toString() + '-12-31')}{' '}
                            Gece
                          </TableCell>
                        </TableRow>
                      );
                    }
                  }
                })
              ) : (
                <TableRow hover>
                  <TableCell align="left">{dateToString(today)}</TableCell>
                  <TableCell align="left">{new Date(today).getFullYear().toString() + '-12-31'}</TableCell>
                  <TableCell align="left">{days(today, new Date(today).getFullYear().toString() + '-12-31')} Gece</TableCell>
                </TableRow>
              ))}

          </TableBody>
        </Table>
      </TableContainer >
    </MainCard >
  );
}
