import { useState } from 'react';

export const useForceUpdate = () => useState<any>()[1];
