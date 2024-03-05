import React from 'react';
import { Pagination } from 'antd';

export default function Paginate({ page = 1, total, pageSize, onChange }) {
    // useEffect(() => {}, [page, total, pageSize]);
    return (
        <div className=" d-flex w-100 justify-center">
            <Pagination
                defaultCurrent={page}
                total={total}
                pageSize={pageSize}
                onChange={onChange}
                showSizeChanger={false}
            />
        </div>
    );
}
