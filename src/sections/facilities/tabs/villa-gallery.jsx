/* eslint-disable prettier/prettier */
import { Box, Button, Grid, Stack } from '@mui/material';

// third-party


// project-imports
import MainCard from 'components/MainCard';
import { forwardRef, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { GetPhotos, PhotoPut } from 'services/photoService';
import { ReactSortable } from 'react-sortablejs';
import Loader from 'components/Loader';
import { Add, ArrangeHorizontal, CloudChange } from 'iconsax-react';
const CustomComponent = forwardRef < HTMLDivElement > ((props, ref) => {
  return <div ref={ref}>{props.children}</div>;
});

export default function VillaGallerySection() {
  const params = useParams();

  const [photo, setPhoto] = useState();
  const [lineChangeLoading, setLineChangeLoading] = useState(true);
  const [photoList, setPhotoList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id > 0 && loading)
      GetPhotos(params.id).then((res) => { setPhoto(res.data); setPhotoList(res.data); setLoading(false); })
  }, [loading])

  const handeLineSave = () => {
    setLoading(true)
    // const values = {
    //   id: 2583,
    //   line: 2
    // }

    // const data = {
    //   ...values
    // }

    //PhotoPut(2583, { data });


    var indexLenght = 0;
    
    photo.forEach((item, index) => {
      console.log('click => ', item.id + ' - ' + index);

      indexLenght = index + 1;

      const values = {
        id: item.id,
        line: index
      }

      const data = {
        ...values
      }

      PhotoPut(item.id, { data }).then((res)=> {
        //burada kaldim|
        setLoading(false)
      });


      // PhotoUpdate(item.id, { data }).then((res) => {
      //   //console.log(res);
      // })
      // apiRequest('PUT', '/photos/' + item.id, {
      //   data: {
      //     id: item.id,
      //     line: index
      //   }
      // }).then((res) => {
      //   indexLenght = index + 1;
      //   if (photo.length === indexLenght) {
      //     dispatch(
      //       openSnackbar({
      //         open: true,
      //         message: 'Sıralama Güncellendi..',
      //         variant: 'alert',
      //         alert: {
      //           color: 'success'
      //         },
      //         close: false
      //       })
      //     );
      //     setLineChangeLoading(false);
      //   }
      // });
    });




  };

  if (loading) return (<Loader open={loading} />)
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Grid container spacing={3}>

          <Grid item xs={12}>
            <MainCard>
              <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" sx={{ paddingBottom: 4 }}>


                <Stack direction="row" alignItems="center" spacing={2}>
                  <Button variant="contained" startIcon={<Add />} size="large">
                    Resim Ekle
                  </Button>
                  <Button variant="contained" color='warning' startIcon={<ArrangeHorizontal />} onClick={handeLineSave} size="large">
                    SIRALAMAYI KAYDET
                  </Button>
                </Stack>
              </Stack>
              <Grid container spacing={1.25}>
                {!loading && (
                  <ReactSortable tag={CustomComponent} list={photo} setList={setPhoto}>
                    {photo.map((item, index) => (
                      <div style={{ width: '160px', height: '170px', float: 'left', margin: '10px' }} key={item.attributes.line} data-index={index}>
                        <img src={item.attributes.photo.data.attributes.url} width={160} height={140} style={{ border: '3px solid #999696' }} />
                        <span style={{ float: 'left', lineHeight: '16px' }}>[id: {item.id}] - </span>
                        <span style={{ float: 'left', lineHeight: '16px' }}>[index: {index}] - </span>
                        <span style={{ float: 'left', lineHeight: '16px' }}>[line: {item.attributes.line}]</span>

                      </div>
                    ))}
                  </ReactSortable>
                )}


              </Grid>

            </MainCard>
          </Grid>

        </Grid>
      </Grid>
    </Grid>
  );
}
