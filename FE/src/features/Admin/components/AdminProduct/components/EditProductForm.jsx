import { yupResolver } from '@hookform/resolvers/yup';
import InputField from 'components/form-controls/InputField';
import TextAreaField from 'components/form-controls/TextAreaField';
import CategoryField from 'components/form-controls/CategoryField';
import GenderField from 'components/form-controls/GenderField';
import TextEditor from 'components/form-controls/TextEditor';
import { EditorState } from 'draft-js';
import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw, convertFromHTML, ContentState } from 'draft-js';

function EditProductForm({ onSubmit, product }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [imgProduct, setImgProduct] = useState();
  console.log("image",imgProduct)

 
  const schema = yup.object().shape({
    name: yup.string().required('Please enter product name'),
    price: yup
      .number()
      .required('Please enter product price')
      .typeError('Please enter product price'),
    content: yup.string().required('Please enter product content'),
    category_id: yup
      .number()
      .required('Please enter product category')
      .typeError('Please enter product category'),
    feature: yup
      .number()
      .required('Please enter product feature')
      .typeError('Please enter product feature'),
     
    sale: yup
      .number()
      .required('Please enter product feature')
      .typeError('Please enter product feature')
      .max(1)
      .min(0),
  });

  const form = useForm({
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    
    product &&
      form.reset({
        name: product.name,
        price: product.price,
        content: product.content,
        category_id: product.category_id,
        feature: product.feature,
        
      
        sale: product.sale,
       
      });
      product &&
      product.images &&
      setImgProduct({
        preview: product.images,
      });
    if (product) {
      const blocksFromHTML = convertFromHTML(product.description);
      const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      setEditorState(EditorState.createWithContent(state));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);


   console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));

  // const handleImgChange = () => {
  //   const file = imgRef.current.files[0];
  // };





  const handleSubmit = (values) => {

    console.log(values.sale)

    const formData = new FormData();
    formData.append('name', values.name);
   

    formData.append('price', values.price);
    formData.append('content', values.content);
    formData.append(
      'description',
     
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
    formData.append('index_categories', values.category_id);
    formData.append('feature', values.feature===1?"Yes":"No");
    formData.append('discount', values.sale===0?"No":values.sale);
    formData.append('products', imgProduct);
    if (!onSubmit) return;
    console.log("formdata",formData)
    onSubmit(formData);
    form.reset({
      name: '',
      price: '',
      content: '',
      category_id: 1,
      feature: 0,
      sale: 0,
    });
    // setImgProduct = 0
    setEditorState(EditorState.createEmpty());
    setImgProduct(null);
  };
  return (
    <div className='create-product'>
      <h3>Chỉnh sửa  sản phẩm</h3>
      <form onSubmit={form.handleSubmit(handleSubmit)}enctype="multipart/form-data" method="POST">
        <InputField
          placeholder=''
          name='name'
          form={form}
          label='Nhập tên sản phẩm'
        />
        <InputField
          placeholder=''
          name='price'
          form={form}
          label='Nhập giá sản phẩm'
        />
        <TextAreaField
          placeholder=''
          name='content'
          form={form}
          label='Nhập nội dung sản phẩm'
        />
        <TextEditor
          label='Nhập mô tả sản phẩm'
          state={editorState}
          onChange={(values) => setEditorState(values)}
        />
        <CategoryField label='Chọn danh mục' form={form} name='category_id' />
        <GenderField
          label='Nổi bật'
          form={form}
          name='feature'
          title={['Có', 'Không']}
        />
       
        <InputField
          placeholder='0.15'
          name='sale'
          form={form}
          label='Giảm giá'
          type='number'
        />
        <div
          className='input-field'
          style={{
            margin: '10px 0 0',
          }}
        >
          <p>Chọn ảnh</p>
          <input
          
            type='file'
            id='img'
            name='img'
        
            style={{
              cursor: 'pointer',
            }}
            onChange={(e)=>setImgProduct(e.target.files[0])}
          />
          {imgProduct && (
            <img
              style={{
                marginTop: '10px',
              }}
              width={'25%'}
              src={imgProduct.preview}
              alt=''
            />
          )}
          
        </div>
        <button
          style={{
            marginTop: '20px',
            width: '100%',
            padding: '6px',
            cursor: 'pointer',
            border: 'none',
            borderRadius: '6px',
            color: '#fff',
            backgroundColor: 'rgb(1, 173, 171)',
            '&:hover': {
              opacity: '0.8',
            },
          }}
        >
          Chỉnh sửa sản phẩm
        </button>
      </form>
    </div>
  );
}


export default EditProductForm;