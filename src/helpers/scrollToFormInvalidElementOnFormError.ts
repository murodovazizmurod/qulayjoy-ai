// import { crush, get } from 'radash';
// import { FieldErrors } from 'react-hook-form';

// // NOTE: if there exists another element with the same name attribute. we might scroll into it accidentally
// export default (errors: FieldErrors) => {
//   // getting name of first error
//   // and finding the corresponding dom element by name attribute

//   const oneDimensionalErrors = crush(errors);

//   const firstErrorFieldPropName = Object.keys(oneDimensionalErrors).find(key => key.endsWith('.ref.name'));

//   if (!firstErrorFieldPropName) {
//     return;
//   }

//   const firstFieldName = get<string>(errors, `${firstErrorFieldPropName}`) || '';

//   const firstFieldElement = document.getElementsByName(firstFieldName);

//   if (!firstFieldElement || !firstFieldElement.length) {
//     return;
//   }

//   firstFieldElement[0]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
// };
