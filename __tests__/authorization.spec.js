import indexPug from 'src/views/pages/index.pug'; // @ почему то тоже не работает
import authorization from '@modules/authorization';

it('test authorization', () => {
    console.log(indexPug, authorization)
})