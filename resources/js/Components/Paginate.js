import { Pagination } from 'antd';
import React, { useEffect } from 'react';

export default function Paginate({ page = 1, total, pageSize, onChange }) {
    useEffect(() => {}, [page, total, pageSize]);
    return (
        <div>
            <Pagination
                defaultCurrent={page}
                total={total}
                defaultPageSize={pageSize}
                onChange={onChange}
                showSizeChanger={false}
            />
        </div>
    );
}
