import test from 'node:test';
import assert from 'node:assert/strict';
import {detailErrors,currentDetails,activeFields} from '../src/categories.js';
test('a valid truck is not blocked by invisible motorcycle fields',()=>{assert.deepEqual(detailErrors('truck',{condition:'중고',brand:'Hyundai',payload:'5톤',year:'2022',fuel:'디젤',km:'0'}),{});});
test('switching to new vehicles removes hidden used mileage validation and export',()=>{const form={condition:'신차',brand:'Hyundai',payload:'5톤',year:'2022',fuel:'디젤',km:'-9'};assert.deepEqual(detailErrors('truck',form),{});assert.ok(!('km' in currentDetails('truck',form)));});
test('parts do not validate or export fields left in other categories',()=>{const form={condition:'중고',partType:'자동차 부품',origin:'대한민국',brand:'Honda',model:'PCX',payload:'5톤',km:'-1'};assert.deepEqual(detailErrors('parts',form),{});assert.deepEqual(currentDetails('parts',form),{partType:'자동차 부품',origin:'대한민국'});});
test('required truck payload and fuel are enforced',()=>{const e=detailErrors('truck',{condition:'중고',brand:'Hyundai',year:'2022',km:'1'});assert.deepEqual(Object.keys(e).sort(),['fuel','payload']);});
test('used car extras are absent from new-car forms',()=>{const fields=activeFields('car','신차').map(f=>f.key);for(const key of ['km','owners','accessories','inspection'])assert.ok(!fields.includes(key));});

