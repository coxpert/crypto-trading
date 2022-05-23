const LoadingIcon = () => {
  return (
    <svg viewBox="0 0 8 10">
      <rect x="0" y="3" width="2" height="4" fill={'black'}>
        <animate
          attributeName="height"
          attributeType="XML"
          values="4; 10; 4"
          begin="0s"
          dur="0.6s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          attributeType="XML"
          values="3; 0; 3"
          begin="0s"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="3" y="2.25" width="2" height="5.5" fill={'black'}>
        <animate
          attributeName="height"
          attributeType="XML"
          values="4; 10; 4"
          begin="0.15s"
          dur="0.6s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          attributeType="XML"
          values="3; 0; 3"
          begin="0.15s"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="6" y="1.5" width="2" height="7" fill={'black'}>
        <animate
          attributeName="height"
          attributeType="XML"
          values="4; 10; 4"
          begin="0.3s"
          dur="0.6s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          attributeType="XML"
          values="3; 0; 3"
          begin="0.3s"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  )
}

export default LoadingIcon
